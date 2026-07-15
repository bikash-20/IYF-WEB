// scripts/shoot.mjs — capture full-page screenshots of the built IYF site
// in light + dark themes, across the most important routes.
//
// Usage: node scripts/shoot.mjs
// Output: scripts/shots/<page>-<theme>.png

import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, 'shots');
const URL = 'http://localhost:4173';

const CHROME =
  '/Users/bikashtalukder/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'schedule', path: '/schedule' },
];

const THEMES = ['light', 'dark'];

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    localStorage.setItem('iyf-theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.dataset.theme = t;
    document.documentElement.style.colorScheme = t;
  }, theme);
}

async function shoot(browser, route, theme) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL + route.path, { waitUntil: 'networkidle0', timeout: 30000 });
  await setTheme(page, theme);
  // Wait for any post-toggle transitions / reveal-on-scroll animations
  await new Promise((r) => setTimeout(r, 1200));
  // Force scroll to top in case the route remembers scroll position
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  const file = resolve(OUT, `${route.name}-${theme}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
  return file;
}

(async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });
  try {
    for (const t of THEMES) {
      for (const r of PAGES) {
        const file = await shoot(browser, r, t);
        console.log('shot', t, r.name, '→', file);
      }
    }
  } finally {
    await browser.close();
  }
})();