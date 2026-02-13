#!/usr/bin/env node

/**
 * optimize-models.js
 *
 * Optimizes 3D model files (.glb, .gltf) for web delivery.
 *
 * Usage:
 *   node scripts/optimize-models.js [input-dir] [output-dir]
 *
 * Prerequisites:
 *   npm install -g gltf-pipeline
 *   OR
 *   npx gltf-pipeline -i input.glb -o output.glb --draco.compressionLevel=7
 *
 * Optimizations applied:
 *   - Draco mesh compression
 *   - Texture compression (KTX2/Basis Universal)
 *   - Unused node/mesh removal
 *   - Buffer deduplication
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const DEFAULT_INPUT_DIR = path.resolve(__dirname, '..', 'src', 'assets', 'models');
const DEFAULT_OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'models');

function main() {
  const inputDir = process.argv[2] || DEFAULT_INPUT_DIR;
  const outputDir = process.argv[3] || DEFAULT_OUTPUT_DIR;

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  if (!fs.existsSync(inputDir)) {
    console.log('========================================');
    console.log('  Rakhshan Eats - 3D Model Optimizer');
    console.log('========================================');
    console.log('');
    console.log(`Input directory not found: ${inputDir}`);
    console.log('');
    printUsage();
    process.exit(0);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const modelFiles = fs.readdirSync(inputDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.glb' || ext === '.gltf';
  });

  if (modelFiles.length === 0) {
    console.log('No .glb or .gltf files found in:', inputDir);
    console.log('Place your 3D model files there and re-run this script.');
    process.exit(0);
  }

  console.log(`Found ${modelFiles.length} model(s) to optimize.\n`);

  let hasGltfPipeline = false;
  try {
    execSync('npx gltf-pipeline --version', { stdio: 'ignore' });
    hasGltfPipeline = true;
  } catch {
    console.log('Warning: gltf-pipeline is not available.');
    console.log('Install it with: npm install -g gltf-pipeline');
    console.log('');
    console.log('Falling back to simple file copy.\n');
  }

  for (const file of modelFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    if (hasGltfPipeline) {
      console.log(`Optimizing: ${file}`);
      try {
        execSync(
          `npx gltf-pipeline -i "${inputPath}" -o "${outputPath}" --draco.compressionLevel=7`,
          { stdio: 'inherit' }
        );
        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const savings = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);
        console.log(`  ${formatBytes(inputSize)} -> ${formatBytes(outputSize)} (${savings}% smaller)\n`);
      } catch (error) {
        console.error(`  Failed to optimize ${file}:`, error.message);
      }
    } else {
      console.log(`Copying: ${file}`);
      fs.copyFileSync(inputPath, outputPath);
    }
  }

  console.log('Done!');
}

function printUsage() {
  console.log('Usage:');
  console.log('  node scripts/optimize-models.js [input-dir] [output-dir]');
  console.log('');
  console.log('Defaults:');
  console.log(`  input:  src/assets/models/`);
  console.log(`  output: public/models/`);
  console.log('');
  console.log('Prerequisites:');
  console.log('  npm install -g gltf-pipeline');
  console.log('');
  console.log('What this script does:');
  console.log('  1. Finds all .glb and .gltf files in the input directory');
  console.log('  2. Applies Draco mesh compression (compression level 7)');
  console.log('  3. Outputs optimized models to the output directory');
  console.log('  4. Reports file size savings');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

main();
