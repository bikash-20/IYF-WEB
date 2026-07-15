import puppeteer from 'puppeteer-core';
const CHROME = '/Users/bikashtalukder/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto('http://localhost:4173/about');
await page.evaluate(() => {
  localStorage.setItem('iyf-theme', 'dark');
  document.documentElement.classList.add('dark');
});
await new Promise(r => setTimeout(r, 1000));
const r = await page.evaluate(() => {
  const html = document.documentElement;
  const ph = document.querySelector('section');
  return {
    htmlClass: html.className,
    htmlMatchesDark: html.matches('.dark'),
    phClassList: Array.from(ph.classList),
    phBg: getComputedStyle(ph).backgroundColor,
    phMatchedRules: (() => {
      // fetch matched CSS rules for the section
      // can't access matchedRules directly; instead check computed
      const cs = getComputedStyle(ph);
      return cs.backgroundColor;
    })(),
  };
});
console.log(JSON.stringify(r, null, 2));
await browser.close();