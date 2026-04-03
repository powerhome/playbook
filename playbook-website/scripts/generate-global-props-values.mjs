#!/usr/bin/env node
/**
 * Generates globalPropsValues.ts from global-props.schema.json
 * 
 * Replaces the manually maintained globalPropsValues.ts file with
 * auto-generated content from our schema.
 * 
 * Usage: node scripts/generate-global-props-values.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SCHEMA_PATH = path.resolve(__dirname, '../../playbook/app/pb_kits/playbook/utilities/global-props.schema.json');
const OUTPUT_PATH = path.resolve(__dirname, '../app/javascript/components/AvailableProps/globalPropsValues.ts');

function getTypeFromSchema(prop) {
  const type = prop.type || '';
  
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'object') return 'object';
  if (type.includes('enum') || prop.values?.length) return 'union';
  
  return 'string';
}

function formatValues(prop) {
  if (!prop.values || prop.values.length === 0) {
    return '[]';
  }
  
  const formatted = prop.values.map(v => `"${v}"`).join(' | ');
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
      
      return `  {
    prop: "${name}",
    type: "${type}",
    values: ${values}
  }`;
    });

  const output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * 
 * Generated from: playbook/app/pb_kits/playbook/utilities/global-props.schema.json
 * Run: yarn generate:global-props-values
 */

const globalPropsValues = [
${entries.join(',\n')}
];

export default globalPropsValues;
`;

  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`✅ Generated ${OUTPUT_PATH}`);
  console.log(`   ${entries.length} global props`);
}

generate();
