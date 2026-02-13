#!/usr/bin/env node

/**
 * pre-commit.js
 *
 * Pre-commit check script for Rakhshan Eats.
 * Runs type checking, linting, and formatting checks on staged files.
 *
 * Usage:
 *   node scripts/pre-commit.js
 *
 * To install as a Git hook:
 *   Add to .husky/pre-commit or run directly from package.json scripts.
 */

const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const checks = [
  {
    name: 'TypeScript type check',
    command: 'npx tsc --noEmit',
  },
  {
    name: 'ESLint',
    command: 'npx eslint src/ --ext .ts,.tsx --max-warnings=0',
  },
  {
    name: 'Prettier format check',
    command: 'npx prettier --check "src/**/*.{ts,tsx,css,json}"',
  },
];

let hasErrors = false;

console.log('========================================');
console.log('  Rakhshan Eats - Pre-commit Checks');
console.log('========================================\n');

for (const check of checks) {
  process.stdout.write(`Running ${check.name}... `);

  try {
    execSync(check.command, {
      cwd: ROOT,
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    console.log('PASSED');
  } catch (error) {
    console.log('FAILED');
    console.log('');
    console.log(`  ${check.name} failed with output:`);

    const output = (error.stdout || '') + (error.stderr || '');
    const lines = output.trim().split('\n');
    lines.slice(0, 20).forEach((line) => {
      console.log(`    ${line}`);
    });
    if (lines.length > 20) {
      console.log(`    ... and ${lines.length - 20} more lines`);
    }
    console.log('');
    hasErrors = true;
  }
}

console.log('----------------------------------------');

if (hasErrors) {
  console.log('Pre-commit checks FAILED.');
  console.log('Please fix the issues above before committing.');
  process.exit(1);
} else {
  console.log('All pre-commit checks PASSED.');
  process.exit(0);
}
