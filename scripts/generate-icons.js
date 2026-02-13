#!/usr/bin/env node

/**
 * generate-icons.js
 *
 * Generates app icons in various sizes from a source SVG or high-res PNG.
 *
 * Usage:
 *   node scripts/generate-icons.js [source-image]
 *
 * Prerequisites:
 *   npm install sharp
 *
 * This script will generate the following icons in public/icons/:
 *   - favicon-16x16.png
 *   - favicon-32x32.png
 *   - apple-touch-icon.png (180x180)
 *   - icon-192x192.png
 *   - icon-512x512.png
 */

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
];

async function main() {
  const sourceImage = process.argv[2];

  if (!sourceImage) {
    console.log('========================================');
    console.log('  Rakhshan Eats - Icon Generator');
    console.log('========================================');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/generate-icons.js <source-image>');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/generate-icons.js src/assets/logo.svg');
    console.log('');
    console.log('Prerequisites:');
    console.log('  npm install sharp');
    console.log('');
    console.log('The following icons will be generated in public/icons/:');
    SIZES.forEach(({ name, size }) => {
      console.log(`  - ${name} (${size}x${size})`);
    });
    console.log('');
    process.exit(0);
  }

  try {
    const sharp = require('sharp');
    const path = require('path');
    const fs = require('fs');

    const outputDir = path.resolve(__dirname, '..', 'public', 'icons');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const { name, size } of SIZES) {
      const outputPath = path.join(outputDir, name);
      await sharp(sourceImage)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outputPath);
      console.log(`Generated: ${name} (${size}x${size})`);
    }

    console.log('\nAll icons generated successfully!');
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('Error: "sharp" package is not installed.');
      console.error('Run: npm install sharp');
      process.exit(1);
    }
    console.error('Error generating icons:', error.message);
    process.exit(1);
  }
}

main();
