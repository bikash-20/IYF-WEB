import fs from 'node:fs';
const j = JSON.parse(fs.readFileSync('scripts/contrast-report.json'));
for (const [key, r] of Object.entries(j)) {
  if (!r.failures || !r.failures.length) continue;
  console.log('========', key, '========', '(total=' + r.total + ' fails=' + r.failures.length + ')');
  const seen = new Map();
  for (const f of r.failures) {
    const k = f.tag + ' :: ' + String(f.cls || '').slice(0, 60) + ' :: text=' + String(f.text || '').slice(0, 40);
    seen.set(k, (seen.get(k) || 0) + 1);
  }
  for (const [k, n] of [...seen.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
    console.log('  ' + String(n).padStart(3) + 'x  ' + k);
  }
}
