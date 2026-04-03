#!/usr/bin/env node
/**
 * Build AI Metadata Distribution
 * ===============================
 * 
 * Consolidates AI metadata into dist/ai/:
 *   - kit.schema.json files for each component
 *   - global-props.schema.json
 *   - all-schemas.json (combined)
 *   - index.json (manifest)
 * 
 * Usage:
 *   yarn build:ai              # Clean and build (default)
 *   yarn build:ai --no-clean   # Incremental build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// CONFIG
// =============================================================================

const KITS_DIR = path.resolve(__dirname, '../app/pb_kits/playbook');
const OUTPUT_DIR = path.resolve(__dirname, '../dist/ai');
const GLOBAL_PROPS_PATH = path.join(KITS_DIR, 'utilities/global-props.schema.json');

// =============================================================================
// HELPERS
// =============================================================================

const readJson = (p) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } };
const writeJson = (p, data) => fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
const getVersion = () => readJson(path.resolve(__dirname, '../package.json'))?.version || 'unknown';

function getKitDirs() {
  return fs.readdirSync(KITS_DIR)
    .filter(d => d.startsWith('pb_') && fs.statSync(path.join(KITS_DIR, d)).isDirectory())
    .map(d => ({ dir: d, name: d.replace('pb_', ''), schemaPath: path.join(KITS_DIR, d, 'kit.schema.json') }))
    .filter(k => fs.existsSync(k.schemaPath));
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const clean = !process.argv.includes('--no-clean');

  console.log('\n📦 Building AI Metadata Distribution');
  console.log('═'.repeat(45) + '\n');

  // Clean if requested (default)
  if (clean && fs.existsSync(OUTPUT_DIR)) {
    console.log('🧹 Cleaning dist/ai...');
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }

  // Create directories
  const kitsOutputDir = path.join(OUTPUT_DIR, 'kits');
  fs.mkdirSync(kitsOutputDir, { recursive: true });

  // Copy global props
  if (fs.existsSync(GLOBAL_PROPS_PATH)) {
    fs.copyFileSync(GLOBAL_PROPS_PATH, path.join(OUTPUT_DIR, 'global-props.schema.json'));
    console.log('✅ global-props.schema.json');
  } else {
    console.log('⚠️  global-props.schema.json not found');
  }

  // Copy kit schemas
  const kits = getKitDirs();
  const manifest = { version: getVersion(), generated: new Date().toISOString(), schemas: { globalProps: 'global-props.schema.json', kits: {} } };
  const allSchemas = { globalProps: readJson(GLOBAL_PROPS_PATH), kits: {} };

  for (const { name, schemaPath } of kits) {
    fs.copyFileSync(schemaPath, path.join(kitsOutputDir, `${name}.schema.json`));
    manifest.schemas.kits[name] = `kits/${name}.schema.json`;
    allSchemas.kits[name] = readJson(schemaPath);
  }

  console.log(`✅ ${kits.length} kit schemas → dist/ai/kits/`);

  // Write manifest and combined schemas
  writeJson(path.join(OUTPUT_DIR, 'index.json'), manifest);
  console.log('✅ index.json');

  writeJson(path.join(OUTPUT_DIR, 'all-schemas.json'), allSchemas);
  console.log('✅ all-schemas.json');

  // Summary
  console.log('\n' + '─'.repeat(45));
  console.log(`📊 Built ${kits.length + 3} files to dist/ai/`);
  console.log('─'.repeat(45) + '\n✨ Done!\n');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
