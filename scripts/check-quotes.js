const fs = require('fs');
const input = fs.readFileSync('src/lib/calculators/converters-pressure-energy-power-time-angles-data.ts', 'utf8');
const lines = input.split('\n');
const bad = [];
lines.forEach((l, i) => {
  const match = l.match(/label:\s*'([^']*)'/);
  if (match) {
    const inner = match[1];
    if (inner.includes("'")) {
      bad.push(i+1);
    }
  }
});
console.log(bad.length > 0 ? 'Bad lines: ' + bad.join(', ') : 'No obvious issues');
