import puppeteer from 'puppeteer-core';
const CHROME = '/Users/bikashtalukder/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  localStorage.setItem('iyf-theme', 'light');
  document.documentElement.classList.remove('dark');
});
await new Promise(r => setTimeout(r, 800));

const trace = await page.evaluate(() => {
  // Find the festival countdown grid
  const out = [];
  const candidates = document.querySelectorAll('section');
  for (const s of candidates) {
    if (s.textContent && s.textContent.includes('Janmashtami')) {
      out.push({ kind: 'section', tag: s.tagName, cls: s.className.slice(0, 80), bg: getComputedStyle(s).backgroundColor, color: getComputedStyle(s).color });
      // walk inner
      const inner = s.querySelector('div.relative.grid');
      if (inner) {
        out.push({ kind: 'inner grid', tag: inner.tagName, cls: inner.className.slice(0, 80), bg: getComputedStyle(inner).backgroundColor, color: getComputedStyle(inner).color });
        // walk text descendants
        for (const c of inner.querySelectorAll('*')) {
          if (!c.textContent || c.children.length > 0) continue;
          const t = c.textContent.trim().slice(0, 30);
          if (t) {
            out.push({ kind: 'text', tag: c.tagName, text: t, bg: getComputedStyle(c).backgroundColor, color: getComputedStyle(c).color, cls: c.className.slice(0, 80) });
          }
        }
      }
      break;
    }
  }
  return out;
});
console.log(JSON.stringify(trace, null, 2));
await browser.close();