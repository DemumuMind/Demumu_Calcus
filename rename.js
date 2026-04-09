const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'src', 'app');

// Rename directories
const renames = [
  { from: '(percentages)/[type]', to: '(percentages)/[percentType]' },
  { from: '(timers)/[slug]', to: '(timers)/[timerId]' },
  { from: '(cooking)/[slug]', to: '(cooking)/[cookingId]' },
];

renames.forEach(({ from, to }) => {
  const fromPath = path.join(baseDir, from);
  const toPath = path.join(baseDir, to);
  
  if (fs.existsSync(fromPath)) {
    fs.renameSync(fromPath, toPath);
    console.log(`Renamed: ${from} → ${to}`);
  } else {
    console.log(`Not found: ${from}`);
  }
});

console.log('Done!');
