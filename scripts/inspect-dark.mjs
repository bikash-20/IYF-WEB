import fs from 'node:fs';
const j = JSON.parse(fs.readFileSync('scripts/contrast-report.json'));
for (const key of ['home-dark', 'about-dark', 'schedule-dark']) {
  const r = j[key];
  console.log('========', key, '========', 'fails=' + r.failures.length);
  // Group by cls prefix to spot systemic
  const seen = new Map();
  for (const f of r.failures) {
    const k = f.cls.slice(0, 70);
    seen.set(k, (seen.get(k) || []).concat([f.text.slice(0, 30)]));
  }
  // Print non-header (heuristic: color not cream-50)
  for (const f of r.failures.filter(f => f.color !== 'rgb(251, 247, 240)').slice(0, 15)) {
    console.log(`  [${f.tag} ${f.fontSize}] ${f.ratio.toFixed(2)} fg=${f.color} bg=${f.bgColor}  "${f.text.replace(/\n/g, ' ')}"  cls=${f.cls.slice(0,60)}`);
  }
}