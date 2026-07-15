// scripts/test-reveal-toggle.mjs — regression test for the v0.8.1 reveal system.
//
// Bug 1: theme toggle (light ↔ dark) used to leave headings / paragraphs at
// opacity:0 forever because Framer Motion's per-element whileInView observer
// was tied to the parent's animation controller.
//
// This script asserts that across every important route:
//   - In light mode, scroll through the page, every reveal target inside
//     the viewport is visible (computed opacity ≥ 0.95).
//   - Toggle to dark WITHOUT a page reload, wait for the CSS transition,
//     scroll back through. Same assertion.
//   - Toggle back to light, scroll, reload in dark — same assertion.
//
// Any failure (a stuck invisible element) prints the offending selector +
// tag text and exits non-zero so CI / pre-deploy scripts can catch it.
//
// Usage: node scripts/test-reveal-toggle.mjs
// Requires: `npm run preview` running on http://localhost:4173

import puppeteer from 'puppeteer-core';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = 'http://localhost:4173';

const CHROME =
  '/Users/bikashtalukder/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell';

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'schedule', path: '/schedule' },
  { name: 'gallery', path: '/gallery' },
  { name: 'courses', path: '/courses' },
  { name: 'visit', path: '/visit' },
  { name: 'events', path: '/events' },
  { name: 'donate', path: '/donate' },
  { name: 'contact', path: '/contact' },
];

const PHASES = [
  // light after fresh load
  { label: 'light→load', theme: 'light', reload: true },
  // dark without reload — the bug surface
  { label: 'dark→toggle', theme: 'dark', reload: false },
  // light without reload
  { label: 'light→toggle', theme: 'light', reload: false },
  // dark with reload — second bug surface
  { label: 'dark→reload', theme: 'dark', reload: true },
];

const OPACITY_THRESHOLD = 0.95;
const FAIL_EXIT_CODE = 1;
const PASS_EXIT_CODE = 0;

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    localStorage.setItem('iyf-theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.dataset.theme = t;
    document.documentElement.style.colorScheme = t;
  }, theme);
}

/**
 * Scroll through the entire page, returning an array of { selector, text,
 * opacity, reason } for every reveal-target whose computed opacity is below
 * the threshold and which is currently inside the viewport.
 *
 * We intentionally exclude the noscript fallback case where the element has
 * never been mounted — those elements just don't exist in the DOM yet.
 */
async function findStuckElements(page) {
  return page.evaluate((threshold) => {
    const stuck = [];
    const targets = document.querySelectorAll('[data-reveal-target]');
    targets.forEach((el) => {
      // Only check elements whose own `data-reveal` is "yes" (the global IO
      // already released them) OR are inside the viewport (in which case the
      // 2s hard fallback should have released them too).
      const rect = el.getBoundingClientRect();
      const inViewport =
        rect.top < window.innerHeight && rect.bottom > 0 &&
        rect.left < window.innerWidth && rect.right > 0;
      if (!inViewport) return;
      const cs = window.getComputedStyle(el);
      const opacity = parseFloat(cs.opacity);
      if (opacity < threshold) {
        stuck.push({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || '').trim().slice(0, 80),
          opacity,
          reveal: el.dataset.reveal,
          classes: el.className?.toString?.().slice(0, 120) ?? '',
        });
      }
    });
    return stuck;
  }, OPACITY_THRESHOLD);
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(window.innerHeight * 0.6, 400);
    let y = 0;
    while (y < document.body.scrollHeight) {
      window.scrollTo(0, y);
      await sleep(180);
      y += step;
    }
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(300);
    window.scrollTo(0, 0);
    await sleep(220);
  });
}

async function runPhase(browser, route, phase) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  if (phase.reload) {
    await page.goto(URL + route.path, { waitUntil: 'networkidle0', timeout: 30000 });
  }
  await setTheme(page, phase.theme);
  // Wait for any post-toggle transitions + 2s fallback release
  await new Promise((r) => setTimeout(r, 2400));
  await scrollThrough(page);
  // Final settle + scroll back to top so viewport-check is repeatable
  await new Promise((r) => setTimeout(r, 400));
  const stuck = await findStuckElements(page);
  await page.close();
  return stuck;
}

(async () => {
  console.log('▶ Reveal-toggle regression test (v0.8.1)');
  console.log('  URL:', URL);
  console.log('  Routes:', ROUTES.length, '  Phases per route:', PHASES.length);

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  let totalFailures = 0;
  const failures = [];

  try {
    for (const route of ROUTES) {
      for (const phase of PHASES) {
        const stuck = await runPhase(browser, route, phase);
        if (stuck.length === 0) {
          console.log(`  ✓ ${route.name} · ${phase.label}`);
        } else {
          totalFailures += stuck.length;
          failures.push({ route: route.name, phase: phase.label, stuck });
          console.log(`  ✗ ${route.name} · ${phase.label}  (${stuck.length} stuck)`);
        }
      }
    }
  } finally {
    await browser.close();
  }

  if (totalFailures > 0) {
    console.log('');
    console.log(`✗ ${totalFailures} stuck element(s) found across ${failures.length} phase(s).`);
    console.log('');
    for (const f of failures) {
      console.log(`── ${f.route} · ${f.phase} ──`);
      for (const s of f.stuck) {
        console.log(`  <${s.tag}> opacity=${s.opacity} reveal=${s.reveal}`);
        if (s.text) console.log(`     "${s.text}"`);
      }
    }
    process.exit(FAIL_EXIT_CODE);
  }

  console.log('');
  console.log(`✓ all ${ROUTES.length * PHASES.length} phases passed — no ghost reveals.`);
  process.exit(PASS_EXIT_CODE);
})();
