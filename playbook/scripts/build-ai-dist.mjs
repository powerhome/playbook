#!/usr/bin/env node
/**
 * Build AI Metadata Distribution
 * ===============================
 *
 * Consolidates AI metadata into dist/ai/:
 *   - kit.schema.json files (usage + menu descriptions)
 *   - global-props.schema.json
 *   - all-schemas.json (schemas only — no playgrounds)
 *   - index.json (manifest)
 *   - playgrounds/*.json (slim patterns for agent codegen)
 *   - visual-index.json (screenshot / visual → kit map)
 *   - external-dependencies.json (aggregated from playground overrides)
 *
 * Usage:
 *   yarn build:ai              # Clean and build (default)
 *   yarn build:ai --no-clean   # Incremental build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildVisualIndex } from './lib/build-visual-index.mjs';
import { enrichSchemaFromMenu, loadMenuCatalog } from './lib/load-menu-catalog.mjs';
import {
  playgroundStats,
  slimPlaygroundConfig,
  usageFromPreset,
} from './lib/slim-playground.mjs';

/** Stamp externalDependencies from playground overrides onto the dist kit schema. */
function enrichSchemaExternalDeps(schema, slimPlayground) {
  const deps = slimPlayground?.externalDependencies;
  if (!schema || !deps) return schema;
  return { ...schema, externalDependencies: deps };
}

/** Aggregate index from kits that declared externalDependencies in playground overrides. */
function buildExternalDependenciesIndex(kitEntries) {
  const kits = {};
  for (const { name, deps } of kitEntries) {
    if (deps) kits[name] = deps;
  }
  return {
    description:
      'Kits that need host-app packages (from each kit’s docs/_playground.overrides.json → externalDependencies). Agents must NOT install packages — tell the user if they are missing.',
    bundledWithPlaybookUi: ['flatpickr', 'intl-tel-input', '@floating-ui/dom', '@popperjs/core'],
    kits,
  };
}

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

const readJson = (p) => {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
};
const writeJson = (p, data, { pretty = true } = {}) => {
  const body = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  fs.writeFileSync(p, `${body}\n`);
};
const getVersion = () => readJson(path.resolve(__dirname, '../package.json'))?.version || 'unknown';

function snakeToPascal(s) {
  return s.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function getKitDirs() {
  return fs
    .readdirSync(KITS_DIR)
    .filter((d) => d.startsWith('pb_') && fs.statSync(path.join(KITS_DIR, d)).isDirectory())
    .map((d) => {
      const name = d.replace('pb_', '');
      return {
        dir: d,
        name,
        schemaPath: path.join(KITS_DIR, d, 'kit.schema.json'),
        playgroundPath: path.join(KITS_DIR, d, 'docs', '_playground.json'),
      };
    })
    .filter((k) => fs.existsSync(k.schemaPath));
}

function enrichSchemaUsage(schema, kitName, slimPlayground) {
  if (!schema || !slimPlayground) return schema;

  const pascal = schema.name || snakeToPascal(kitName);
  const usage = usageFromPreset(kitName, pascal, slimPlayground);
  if (!usage) return schema;

  return {
    ...schema,
    usage: {
      ...schema.usage,
      react: {
        ...(schema.usage?.react || {}),
        ...usage.react,
      },
      rails: {
        ...(schema.usage?.rails || {}),
        ...usage.rails,
      },
    },
  };
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const clean = !process.argv.includes('--no-clean');

  console.log('\n📦 Building AI Metadata Distribution');
  console.log(`${'═'.repeat(45)}\n`);

  if (clean && fs.existsSync(OUTPUT_DIR)) {
    console.log('🧹 Cleaning dist/ai...');
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }

  const kitsOutputDir = path.join(OUTPUT_DIR, 'kits');
  const playgroundsOutputDir = path.join(OUTPUT_DIR, 'playgrounds');
  fs.mkdirSync(kitsOutputDir, { recursive: true });
  fs.mkdirSync(playgroundsOutputDir, { recursive: true });

  if (fs.existsSync(GLOBAL_PROPS_PATH)) {
    fs.copyFileSync(GLOBAL_PROPS_PATH, path.join(OUTPUT_DIR, 'global-props.schema.json'));
    console.log('✅ global-props.schema.json');
  } else {
    console.log('⚠️  global-props.schema.json not found');
  }

  const menuCatalog = loadMenuCatalog();
  const menuKitCount = Object.keys(menuCatalog.kits || {}).length;
  console.log(`✅ menu.yml catalog (${menuKitCount} kits)`);

  const kits = getKitDirs();
  const manifest = {
    version: getVersion(),
    generated: new Date().toISOString(),
    schemas: {
      globalProps: 'global-props.schema.json',
      kits: {},
    },
    playgrounds: {
      index: 'playgrounds/index.json',
      kits: {},
    },
    visualIndex: 'visual-index.json',
    externalDependencies: 'external-dependencies.json',
    kitMeta: {},
  };
  const allSchemas = {
    globalProps: readJson(GLOBAL_PROPS_PATH),
    kits: {},
  };
  const playgroundsIndex = {
    description:
      'Slim playground patterns for AI code generation in consuming apps. Full website playground configs are not shipped here.',
    fields: [
      'presets',
      'hints',
      'conditionals',
      'structureModes',
      'template',
      'children',
      'customProps',
      'wrapper',
      'statefulProps',
      'requiredCodeProps',
      'propTargets',
      'propAliases',
      'codegenDefaultProps',
      'externalImports',
      'imports',
      'externalDependencies',
    ],
    kits: {},
  };

  let playgroundCount = 0;
  let enrichedDescriptions = 0;
  const externalDepEntries = [];

  for (const { name, schemaPath, playgroundPath } of kits) {
    const rawSchema = readJson(schemaPath);
    const rawPlayground = readJson(playgroundPath);
    const slimPlayground = slimPlaygroundConfig(rawPlayground, name);
    const menuKit = menuCatalog.kits?.[name];

    let schema = enrichSchemaFromMenu(rawSchema, name, menuKit);
    if (menuKit?.description && schema.description === menuKit.description) {
      enrichedDescriptions += 1;
    }
    schema = enrichSchemaUsage(schema, name, slimPlayground);
    schema = enrichSchemaExternalDeps(schema, slimPlayground);

    writeJson(path.join(kitsOutputDir, `${name}.schema.json`), schema);
    manifest.schemas.kits[name] = `kits/${name}.schema.json`;
    allSchemas.kits[name] = schema;
    manifest.kitMeta[name] = {
      category: schema.category || menuKit?.category || null,
      description: schema.description || null,
      status: schema.status || menuKit?.status || null,
      schema: `kits/${name}.schema.json`,
      playground: slimPlayground ? `playgrounds/${name}.json` : null,
      ...(schema.externalDependencies
        ? { externalDependencies: schema.externalDependencies }
        : {}),
    };

    if (schema.externalDependencies) {
      externalDepEntries.push({ name, deps: schema.externalDependencies });
    }

    if (slimPlayground) {
      const relativePath = `playgrounds/${name}.json`;
      writeJson(path.join(playgroundsOutputDir, `${name}.json`), slimPlayground, { pretty: false });
      manifest.playgrounds.kits[name] = relativePath;
      playgroundsIndex.kits[name] = {
        path: relativePath,
        ...playgroundStats(slimPlayground),
      };
      playgroundCount += 1;
    }
  }

  const visualIndex = buildVisualIndex({
    menuCatalog,
    kitNames: kits.map((k) => k.name),
  });
  writeJson(path.join(OUTPUT_DIR, 'visual-index.json'), visualIndex, { pretty: false });

  const externalDependencies = buildExternalDependenciesIndex(externalDepEntries);
  writeJson(path.join(OUTPUT_DIR, 'external-dependencies.json'), externalDependencies, {
    pretty: false,
  });

  console.log(`✅ ${kits.length} kit schemas → dist/ai/kits/ (${enrichedDescriptions} descriptions from menu.yml)`);
  console.log(`✅ ${playgroundCount} slim playgrounds → dist/ai/playgrounds/`);
  console.log('✅ visual-index.json');
  console.log(
    `✅ external-dependencies.json (${Object.keys(externalDependencies.kits).length} kits with host deps from overrides)`
  );

  writeJson(path.join(OUTPUT_DIR, 'index.json'), manifest);
  console.log('✅ index.json');

  writeJson(path.join(OUTPUT_DIR, 'all-schemas.json'), allSchemas);
  console.log('✅ all-schemas.json (schemas only; playgrounds are separate)');

  writeJson(path.join(playgroundsOutputDir, 'index.json'), playgroundsIndex, { pretty: false });
  console.log('✅ playgrounds/index.json');

  console.log(`\n${'─'.repeat(45)}`);
  console.log(`📊 Built ${kits.length + playgroundCount + 5} files to dist/ai/`);
  console.log(`${'─'.repeat(45)}\n✨ Done!\n`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
