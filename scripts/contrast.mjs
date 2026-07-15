// scripts/contrast.mjs — audit the built IYF site for text contrast failures
// in both light and dark themes.
//
// Walks every visible text element on each route, computes its effective
// color (after the .dark cascade is applied) and the effective background
// color, then reports WCAG contrast ratios. Fails loudly on anything below
// 4.5:1 for body text and 3.0:1 for large/eyebrow text.

import puppeteer from 'puppeteer-core';
import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, 'contrast-report.json');

const CHROME =
  '/Users/bikashtalukder/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell';

const URL = 'http://localhost:4173';

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'schedule', path: '/schedule' },
];

const THEMES = ['light', 'dark'];

// WCAG 2.1 contrast formula
function rel(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function lum(rgb) {
  return 0.2126 * rel(rgb[0]) + 0.7152 * rel(rgb[1]) + 0.0722 * rel(rgb[2]);
}
function ratio(a, b) {
  const la = lum(a), lb = lum(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

function parseRgba(s) {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(/[ ,/]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const r = +parts[0], g = +parts[1], b = +parts[2];
  const a = parts[3] != null ? +parts[3] : 1;
  return { r, g, b, a };
}

function blend(fg, bg) {
  // fg rgba on top of bg rgb
  const a = fg.a;
  return [
    Math.round(fg.r * a + bg[0] * (1 - a)),
    Math.round(fg.g * a + bg[1] * (1 - a)),
    Math.round(fg.b * a + bg[2] * (1 - a)),
  ];
}

async function walkText(page, route, theme) {
  // Walk every text element, collect raw computed styles + the chain
  // of backgrounds. Do all compositing + ratio calc in Node.
  const rows = await page.evaluate(() => {
    const out = [];
    const all = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,li,dt,dd,span,div,figcaption,button,small,time,blockquote,strong,em,label');
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    for (const el of all) {
      if (!el.innerText || !el.innerText.trim()) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (!document.body.contains(el)) continue;

      // Walk up, collect all bg layers until an opaque one or root.
      const layers = [];
      let n = el;
      while (n) {
        const v = getComputedStyle(n).backgroundColor;
        if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent') {
          layers.unshift(v);
        }
        n = n.parentElement;
      }

      out.push({
        text: (el.innerText || '').trim().slice(0, 80),
        tag: el.tagName.toLowerCase(),
        color: cs.color,
        layers,
        bodyBg,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        cls: el.className && typeof el.className === 'string' ? el.className.slice(0, 100) : '',
      });
    }
    return out;
  });

  // Now compute ratios in Node. Composite the bg layers over body bg,
  // then compare fg vs composited bg.
  const failures = [];
  const warnings = [];
  for (const row of rows) {
    const fg = parseRgba(row.color);
    const body = parseRgba(row.bodyBg);
    if (!fg || !body) continue;

    // Reduce layers top-down, then composite over body.
    const layerRgba = row.layers.map(parseRgba).filter(Boolean);
    let cur = null;
    for (const layer of layerRgba) {
      if (layer.a === 0) continue;
      if (!cur) {
        cur = { r: layer.r, g: layer.g, b: layer.b, a: layer.a };
      } else {
        cur = {
          r: Math.round(layer.r * layer.a + cur.r * (1 - layer.a)),
          g: Math.round(layer.g * layer.a + cur.g * (1 - layer.a)),
          b: Math.round(layer.b * layer.a + cur.b * (1 - layer.a)),
          a: 1,
        };
      }
    }
    let bg;
    if (!cur) {
      bg = body;
    } else if (cur.a < 1) {
      bg = {
        r: Math.round(cur.r * cur.a + body.r * (1 - cur.a)),
        g: Math.round(cur.g * cur.a + body.g * (1 - cur.a)),
        b: Math.round(cur.b * cur.a + body.b * (1 - cur.a)),
      };
    } else {
      bg = cur;
    }

    const r = ratio([fg.r, fg.g, fg.b], [bg.r, bg.g, bg.b]);
    const px = parseFloat(row.fontSize);
    const isLarge = px >= 24 || (px >= 18.66 && parseInt(row.fontWeight, 10) >= 700);
    const min = isLarge ? 3.0 : 4.5;
    if (r < min) {
      failures.push({ ...row, bgColor: `rgb(${bg.r}, ${bg.g}, ${bg.b})`, ratio: +r.toFixed(2), min });
    } else if (r < min + 0.5) {
      warnings.push({ ...row, bgColor: `rgb(${bg.r}, ${bg.g}, ${bg.b})`, ratio: +r.toFixed(2), min });
    }
  }
  return { total: rows.length, failures, warnings };
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });
  const report = {};
  try {
    for (const theme of THEMES) {
      for (const route of ROUTES) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
        await page.goto(URL + route.path, { waitUntil: 'networkidle0', timeout: 30000 });
        await page.evaluate((t) => {
          localStorage.setItem('iyf-theme', t);
          document.documentElement.classList.toggle('dark', t === 'dark');
          document.documentElement.dataset.theme = t;
          document.documentElement.style.colorScheme = t;
        }, theme);
        await new Promise((r) => setTimeout(r, 1500));
        await page.evaluate(() => window.scrollTo(0, 0));
        await new Promise((r) => setTimeout(r, 400));
        const r = await walkText(page, route, theme);
        report[`${route.name}-${theme}`] = r;
        console.log(`${route.name}-${theme}: total=${r.total} fails=${r.failures.length} warns=${r.warnings.length}`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  await writeFile(OUT, JSON.stringify(report, null, 2));
  console.log('wrote', OUT);
})();