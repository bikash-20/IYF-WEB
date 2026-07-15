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
await new Promise(r => setTimeout(r, 600));
await page.evaluate(() => window.scrollTo(0, 400));
await new Promise(r => setTimeout(r, 1000));

const trace = await page.evaluate(() => {
  const link = document.querySelector('header a.group');
  if (!link) return { error: 'no link found' };
  const chain = [];
  let n = link;
  while (n) {
    const cs = getComputedStyle(n);
    chain.push({
      tag: n.tagName,
      cls: typeof n.className === 'string' ? n.className.slice(0, 80) : '',
      bg: cs.backgroundColor,
      color: cs.color,
      pos: cs.position,
      z: cs.zIndex,
    });
    n = n.parentElement;
  }
  return { chain };
});
console.log(JSON.stringify(trace, null, 2));
await browser.close();
