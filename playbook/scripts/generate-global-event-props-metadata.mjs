#!/usr/bin/env node
/**
 * Generate Global Event Props Schema
 * ==================================
 *
 * Parses utilities/globalEventProps.ts into a React-only schema so AI tooling
 * knows which event handlers opted-in kits can accept.
 *
 * Usage:
 *   yarn generate:global-event-props-metadata           # Generate
 *   yarn generate:global-event-props-metadata --dry-run # Preview
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SOURCE_PATH = path.resolve(
  __dirname,
  '../app/pb_kits/playbook/utilities/globalEventProps.ts'
);
const OUTPUT_PATH = path.resolve(
  __dirname,
  '../app/pb_kits/playbook/utilities/global-event-props.schema.json'
);
const SCHEMA_VERSION =
  'https://playbook.powerapp.cloud/schemas/global-event-props-schema.json';

const PROP_DESCRIPTIONS = {
  onClick:
    'Mouse click handler attached to the kit root element. React only; not available on Rails kits.',
};

const PROP_EXAMPLES = {
  onClick: 'onClick={() => console.log("clicked")}',
};

function camelToWords(name) {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function parseEventHandlerType(typeExpr) {
  const normalized = typeExpr.replace(/\s+/g, ' ').trim();
  if (
    /EventHandler/.test(normalized) ||
    /=>/.test(normalized) ||
    /^(\(|function)/.test(normalized)
  ) {
    return 'function';
  }
  return 'unknown';
}

function parseGlobalEventPropsSource(content) {
  const typeMatch = content.match(
    /export\s+type\s+GlobalEventProps\s*=\s*\{([^}]*)\}/s
  );
  if (!typeMatch) {
    throw new Error('Could not find export type GlobalEventProps in source');
  }

  const props = {};
  for (const [, name, typeExpr] of typeMatch[1].matchAll(
    /(\w+)\s*\??\s*:\s*([^,]+),?/g
  )) {
    props[name] = {
      type: parseEventHandlerType(typeExpr),
      platforms: ['react'],
      description: PROP_DESCRIPTIONS[name] || `${camelToWords(name)} event handler.`,
      ...(PROP_EXAMPLES[name] && { example: PROP_EXAMPLES[name] }),
    };
  }

  return props;
}

function buildSchema() {
  const content = fs.readFileSync(SOURCE_PATH, 'utf8');
  const props = parseGlobalEventPropsSource(content);

  return {
    $schema: SCHEMA_VERSION,
    name: 'GlobalEventProps',
    description:
      'React-only event handler props for kits that opt into GlobalEventProps. Separate from class-based GlobalProps. Not available on Rails kits.',
    platforms: ['react'],
    props,
    optIn: {
      description:
        'Only kits whose React props include GlobalEventProps support these handlers. Look for globalEventProps: true on kit.schema.json.',
      example: '} & GlobalProps & GlobalEventProps',
    },
  };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const verbose = process.argv.includes('--verbose');

  console.log('\n🔧 Generating Global Event Props Metadata');
  console.log('═'.repeat(45) + '\n');

  const schema = buildSchema();
  const propCount = Object.keys(schema.props).length;

  console.log(`📦 Parsed ${propCount} event prop(s): ${Object.keys(schema.props).join(', ')}`);

  if (verbose) {
    console.log('\nSchema preview:');
    console.log(JSON.stringify(schema, null, 2));
  }

  if (dryRun) {
    console.log(`\n📝 [DRY RUN] Would write to: ${OUTPUT_PATH}`);
  } else {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(schema, null, 2)}\n`);
    console.log(`\n✅ Written to: ${OUTPUT_PATH}`);
  }

  console.log('\n✨ Done!\n');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
