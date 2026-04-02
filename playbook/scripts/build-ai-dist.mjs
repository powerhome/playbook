#!/usr/bin/env node
/**
 * Build AI Metadata Distribution
 * ===============================
 * 
 * Consolidates all AI-friendly metadata into dist/ai/ for distribution:
 *   - kit.schema.json files for each component
 *   - global-props.schema.json
 *   - index.json with a manifest of all available schemas
 * 
 * Usage:
 *   yarn build:ai              # Clean and build (default)
 *   yarn build:ai --no-clean   # Incremental build without cleaning
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  pbKitsDir: path.resolve(__dirname, '../app/pb_kits/playbook'),
  outputDir: path.resolve(__dirname, '../dist/ai'),
  globalPropsSchema: path.resolve(__dirname, '../app/pb_kits/playbook/utilities/global-props.schema.json'),
};

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  // Default to clean builds to prevent stale artifacts
  const noClean = process.argv.includes('--no-clean');
  const clean = !noClean;

  console.log('');
  console.log('📦 Building AI Metadata Distribution');
  console.log('═'.repeat(50));
  console.log('');

  // Clean output directory (default behavior to prevent stale artifacts)
  if (clean && fs.existsSync(CONFIG.outputDir)) {
    console.log('🧹 Cleaning dist/ai...');
    fs.rmSync(CONFIG.outputDir, { recursive: true });
  }

  // Create output directories
  const kitsDir = path.join(CONFIG.outputDir, 'kits');
  fs.mkdirSync(kitsDir, { recursive: true });

  // Track what we're building
  const manifest = {
    version: getPackageVersion(),
    generated: new Date().toISOString(),
    schemas: {
      globalProps: 'global-props.schema.json',
      kits: {},
    },
  };

  // Copy global props schema
  if (fs.existsSync(CONFIG.globalPropsSchema)) {
    const destPath = path.join(CONFIG.outputDir, 'global-props.schema.json');
    fs.copyFileSync(CONFIG.globalPropsSchema, destPath);
    console.log('✅ global-props.schema.json');
  } else {
    console.log('⚠️  global-props.schema.json not found - run yarn generate:global-props-metadata first');
  }

  // Find and copy all kit schemas
  const kitDirs = fs.readdirSync(CONFIG.pbKitsDir)
    .filter(dir => dir.startsWith('pb_'))
    .filter(dir => fs.statSync(path.join(CONFIG.pbKitsDir, dir)).isDirectory());

  let copiedCount = 0;

  for (const kitDir of kitDirs) {
    const kitName = kitDir.replace('pb_', '');
    const schemaPath = path.join(CONFIG.pbKitsDir, kitDir, 'kit.schema.json');

    if (fs.existsSync(schemaPath)) {
      const destPath = path.join(kitsDir, `${kitName}.schema.json`);
      fs.copyFileSync(schemaPath, destPath);
      manifest.schemas.kits[kitName] = `kits/${kitName}.schema.json`;
      copiedCount++;
    }
  }

  console.log(`✅ ${copiedCount} kit schemas copied to dist/ai/kits/`);

  // Write manifest/index
  const indexPath = path.join(CONFIG.outputDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log('✅ index.json (manifest)');

  // Create a combined schemas file for easy consumption
  const allSchemas = {
    globalProps: loadJsonSafe(CONFIG.globalPropsSchema),
    kits: {},
  };

  for (const kitDir of kitDirs) {
    const kitName = kitDir.replace('pb_', '');
    const schemaPath = path.join(CONFIG.pbKitsDir, kitDir, 'kit.schema.json');
    if (fs.existsSync(schemaPath)) {
      allSchemas.kits[kitName] = loadJsonSafe(schemaPath);
    }
  }

  const allSchemasPath = path.join(CONFIG.outputDir, 'all-schemas.json');
  fs.writeFileSync(allSchemasPath, JSON.stringify(allSchemas, null, 2) + '\n');
  console.log('✅ all-schemas.json (combined)');

  // Summary
  console.log('');
  console.log('─'.repeat(50));
  console.log('📊 Summary');
  console.log('─'.repeat(50));
  console.log(`   Output:      dist/ai/`);
  console.log(`   Kit schemas: ${copiedCount}`);
  console.log(`   Files:`);
  console.log(`     • index.json           - Manifest with paths`);
  console.log(`     • global-props.schema.json`);
  console.log(`     • all-schemas.json     - All schemas combined`);
  console.log(`     • kits/*.schema.json   - Individual kit schemas`);
  console.log('');
  console.log('✨ Done!');
  console.log('');
}

function getPackageVersion() {
  try {
    const pkgPath = path.resolve(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return pkg.version;
  } catch {
    return 'unknown';
  }
}

function loadJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
