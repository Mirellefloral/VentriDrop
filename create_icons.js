const { createCanvas } = require('canvas');

function drawIcon(size, path) {
  // Fallback: create a simple colored square with emoji
  console.log(`Icon ${size}x${size} -> ${path} (placeholder)`);
}

// We'll skip canvas and just note icons need to be generated
console.log('Icons skipped - manifest will work without them');
