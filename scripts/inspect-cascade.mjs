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

// Use CDP via raw protocol to get matched CSS rules
const client = await page.target().createCDPSession();
await client.send('DOM.enable');
await client.send('CSS.enable');
const { root } = await client.send('DOM.getDocument', { depth: -1 });

// Find the PageHero section
const { nodeId } = await client.send('DOM.querySelector', {
  nodeId: root.nodeId,
  selector: 'section.relative.overflow-hidden',
});

const { matchedCSSRules } = await client.send('CSS.getMatchedStylesForNode', { nodeId });
for (const rule of matchedCSSRules) {
  const sel = rule.rule.selectorList.text;
  if (sel.includes('cream') || sel.includes('ink-section-2') || sel.includes('cream-100')) {
    console.log('SEL:', sel);
    for (const p of rule.rule.style.cssProperties) {
      if (p.name === 'background-color') console.log('  ', p.name, '=', p.value, 'origin=', rule.rule.origin, 'important=', p.important);
    }
  }
}
await browser.close();