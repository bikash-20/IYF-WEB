import puppeteer from 'puppeteer-core';
const CHROME = '/Users/bikashtalukder/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:4173/about', { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  localStorage.setItem('iyf-theme', 'dark');
  document.documentElement.classList.add('dark');
});
await new Promise(r => setTimeout(r, 800));

const trace = await page.evaluate(() => {
  const out = [];
  const ph = document.querySelector('section');
  if (!ph) return { error: 'no section' };
  out.push({ kind: 'section', bg: getComputedStyle(ph).backgroundColor, color: getComputedStyle(ph).color, cls: ph.className.slice(0, 100) });
  // breadcrumb nav
  const bc = ph.querySelector('nav');
  if (bc) out.push({ kind: 'nav', bg: getComputedStyle(bc).backgroundColor, color: getComputedStyle(bc).color, cls: bc.className.slice(0, 100) });
  // walk the description text
  const desc = ph.querySelector('p');
  if (desc) out.push({ kind: 'desc p', bg: getComputedStyle(desc).backgroundColor, color: getComputedStyle(desc).color, cls: desc.className.slice(0, 100) });
  return out;
});
console.log(JSON.stringify(trace, null, 2));
await browser.close();