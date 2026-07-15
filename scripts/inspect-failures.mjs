import fs from 'node:fs';
const j = JSON.parse(fs.readFileSync('scripts/contrast-report.json'));
const fail = j['home-light'].failures;

// Categorize: in-header vs not-in-header, in-glass-deep vs not
const inHeader = [];
const notInHeader = [];
for (const f of fail) {
  // heuristic: if text color is cream (251,247,240) AND font-size in
  // typical navbar range, it might be hero-mode navbar
  if (f.color === 'rgb(251, 247, 240)' && parseFloat(f.fontSize) <= 20) {
    inHeader.push(f);
  } else {
    notInHeader.push(f);
  }
}
console.log('home-light total fails:', fail.length);
console.log('  cream-text (likely hero-navbar):', inHeader.length);
console.log('  other (real?):', notInHeader.length);
console.log('');
console.log('--- non-header failures ---');
for (const f of notInHeader.slice(0, 30)) {
  console.log(`[${f.tag} ${f.fontSize}/${f.fontWeight}] ratio=${f.ratio} fg=${f.color} bg=${f.bgColor}`);
  console.log(`  text="${f.text.replace(/\n/g, ' ')}"`);
  console.log(`  cls="${f.cls}"`);
  console.log('');
}
