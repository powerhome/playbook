#!/usr/bin/env node
/**
 * Generates globalEventPropsValues.ts from global-event-props.schema.json
 *
 * Usage: node scripts/generate-global-event-props-values.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCHEMA_PATH = path.resolve(
  __dirname,
  '../../playbook/app/pb_kits/playbook/utilities/global-event-props.schema.json'
);
const OUTPUT_PATH = path.resolve(
  __dirname,
  '../app/javascript/components/Website/src/components/AvailableProps/globalEventPropsValues.ts'
);

function getTypeFromSchema(prop) {
  const type = prop.type || '';

  if (type === 'function') return 'function';
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'object') return 'object';

  return type || 'function';
}

function formatValues(prop) {
  if (prop.example) {
    return `'${String(prop.example).replace(/'/g, "\\'")}'`;
  }
  if (!prop.values || prop.values.length === 0) {
    return '[]';
  }

  const formatted = prop.values.map((v) => `"${v}"`).join(' | ');
  return `'${formatted}'`;
}

function generate() {
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  const props = schema.props || {};

  const entries = Object.entries(props)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, prop]) => {
      const type = getTypeFromSchema(prop);
      const values = formatValues(prop);
      const platforms = prop.platforms || ['react'];

      return `  {
    prop: "${name}",
    type: "${type}",
    values: ${values},
    platforms: ${JSON.stringify(platforms)}
  }`;
    });

  const output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 *
 * Generated from: playbook/app/pb_kits/playbook/utilities/global-event-props.schema.json
 * Run: yarn generate:global-event-props-values
 */

const globalEventPropsValues = [
${entries.join(',\n')}
];

export default globalEventPropsValues;
`;

  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`✅ Generated ${OUTPUT_PATH}`);
  console.log(`   ${entries.length} global event prop(s)`);
}

generate();
