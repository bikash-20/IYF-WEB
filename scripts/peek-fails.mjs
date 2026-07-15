// Quick peek at remaining text elements on the home page that the audit
// might be flagging. Used to triage residual failures.
import puppeteer from 'puppeteer-core';

const CHROME = '/Users/bikashtalukder/.cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const URL = 'http://127.0.0.1:4173/';

const b = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME,
  args: ['--no-sandbox'],
});
const p = await b.newPage();
await p.setViewport({ width: 1280, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
const items = await p.evaluate(() => {
  const out = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  let node;
  while ((node = walk.nextNode())) {
    const text = (node.textContent || '').trim();
    if (!text || text.length < 2) continue;
    const el = node.parentElement;
    if (!el) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    out.push({
      tag: el.tagName,
      cls: (el.className || '').toString().substring(0, 80),
      txt: text.substring(0, 60),
      fg: cs.color,
      sz: cs.fontSize,
      wt: cs.fontWeight,
    });
  }
  return out;
});
console.log('total text nodes:', items.length);
// group by approximate font size, print unique sample
const sample = items.filter((x) => /saffron|text-saffron|bg-cream/i.test(x.cls));
console.log('---Saffron/cream-class samples:');
console.log(JSON.stringify(sample.slice(0, 20), null, 2));
await b.close();