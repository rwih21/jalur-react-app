const fs = require('fs');
const d = JSON.parse(fs.readFileSync('.graphify/.graphify_detect.json', 'utf-8'));
const files = (d.files.code || []).concat(d.files.document || [], d.files.paper || [], d.files.image || [], d.files.video || []);
const count = {};
for (const f of files) {
  const parts = f.replace(/\\/g, '/').split('/').filter(Boolean);
  const top = parts.slice(0, 2).join('/');
  count[top] = (count[top] || 0) + 1;
}
const top5 = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 5);
console.log('Total files:', files.length);
for (const [k, v] of top5) console.log('  ' + k + ': ' + v);