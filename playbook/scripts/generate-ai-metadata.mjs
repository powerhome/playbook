#!/usr/bin/env node
/**
 * Generate AI-Friendly Metadata for Playbook Components
 * ======================================================
 * 
 * Generates kit.schema.json files by parsing TypeScript and Ruby source files.
 * 
 * How it works:
 *   1. Parse .tsx files for React prop definitions
 *   2. Parse .rb files for Rails prop definitions  
 *   3. Merge props from both platforms
 *   4. Generate descriptions from component names
 * 
 * Limitations (regex-based parsing):
 *   - Only parses `type XProps = {}` patterns, not interfaces
 *   - May miss composed/extended types
 *   - Imported prop types are not followed
 * 
 * Usage:
 *   yarn generate:ai-metadata                    # All components
 *   yarn generate:ai-metadata --kit=button       # Single component
 *   yarn generate:ai-metadata --dry-run          # Preview only
 *   yarn generate:ai-metadata --verbose          # Detailed output
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getGlobalPropNames } from './lib/global-props-parser.mjs';

// =============================================================================
// CONFIGURATION
// =============================================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  pbKitsDir: path.resolve(__dirname, '../app/pb_kits/playbook'),
  schemaVersion: 'https://playbook.powerapp.cloud/schemas/kit-schema.json',
  excludedDirs: ['docs', 'utilities'],
};

const GLOBAL_PROPS = getGlobalPropNames();
['aria', 'data', 'htmlOptions', 'id', 'className', 'children', 'key', 'ref'].forEach(p => GLOBAL_PROPS.add(p));

// =============================================================================
// HELPERS
// =============================================================================

const snakeToCamel = (s) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const camelToSnake = (s) => s.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`);
const snakeToPascal = (s) => s.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join('');

const isQuoted = (s) => (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"));
const stripQuotes = (s) => s.slice(1, -1);

const readFile = (p) => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;

/**
 * Parse a literal value (JS or Ruby) into native type.
 */
function parseLiteral(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === 'undefined' || val === 'nil') return null;
  if (isQuoted(val)) return stripQuotes(val);
  if (val !== '' && !isNaN(val)) return Number(val);
  if (val === '{}') return {};
  if (val === '[]') return [];
  return val;
}

/**
 * Extract balanced braces content starting after an opening brace.
 */
function extractBracedContent(content, startIndex) {
  let depth = 1, i = startIndex;
  while (depth > 0 && i < content.length) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') depth--;
    i++;
  }
  return content.slice(startIndex, i - 1);
}

// =============================================================================
// TYPESCRIPT PARSING
// =============================================================================

/**
 * Parse TypeScript type string into schema format.
 */
function parseTypeString(typeStr) {
  if (!typeStr) return { type: 'any' };
  typeStr = typeStr.replace(/\s+/g, ' ').trim();

  // Union of literals: "a" | "b" | "c"
  if (typeStr.includes('|')) {
    const parts = typeStr.split('|').map(p => p.trim());
    const isAllLiterals = parts.every(p => 
      isQuoted(p) || p === 'null' || p === 'undefined' || !isNaN(Number(p))
    );
    
    if (isAllLiterals) {
      const values = parts
        .filter(p => p !== 'null' && p !== 'undefined')
        .map(p => isQuoted(p) ? stripQuotes(p) : Number(p));
      return { type: 'enum', values };
    }
    return { type: typeStr };
  }

  // Primitives
  if (['string', 'number', 'boolean'].includes(typeStr)) return { type: typeStr };
  
  // React types
  if (/React|Node|Element/.test(typeStr)) return { type: 'ReactNode' };
  
  // Functions
  if (typeStr.includes('=>') || typeStr.startsWith('(') || typeStr.includes('Handler')) {
    return { type: 'function' };
  }
  
  // Objects/Arrays
  if (typeStr.startsWith('{')) return { type: 'object' };
  if (typeStr.endsWith('[]') || typeStr.startsWith('Array')) return { type: 'array' };

  return { type: typeStr };
}

/**
 * Parse props from a TypeScript type block.
 */
function parseTypeBlock(block) {
  const props = {};
  let currentProp = null;
  let currentType = '';
  let depth = 0;

  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

    depth += (trimmed.match(/\{/g) || []).length - (trimmed.match(/\}/g) || []).length;

    const match = trimmed.match(/^(\w+)\??:\s*(.*)$/);
    if (match && depth <= 0) {
      if (currentProp && currentType && !GLOBAL_PROPS.has(currentProp)) {
        const typeInfo = parseTypeString(currentType.replace(/,\s*$/, '').trim());
        props[currentProp] = { type: typeInfo.type, platforms: ['react'], ...typeInfo.values && { values: typeInfo.values } };
      }
      currentProp = match[1];
      currentType = match[2].replace(/,\s*$/, '');
      if (!currentType.includes('{') || currentType.includes('}')) depth = 0;
    } else if (currentProp && depth > 0) {
      currentType += ' ' + trimmed.replace(/,\s*$/, '');
    }
  }

  if (currentProp && currentType && !GLOBAL_PROPS.has(currentProp)) {
    const typeInfo = parseTypeString(currentType.replace(/,\s*$/, '').trim());
    props[currentProp] = { type: typeInfo.type, platforms: ['react'], ...typeInfo.values && { values: typeInfo.values } };
  }

  return props;
}

/**
 * Extract default values from destructuring: const { x = "default" } = props
 */
function extractDefaults(content, props) {
  const regex = /(?:const|let)\s*\{([^}]+)\}\s*=\s*(?:props|this\.props)/g;
  for (const [, destructure] of content.matchAll(regex)) {
    for (const [, name, val] of destructure.matchAll(/(\w+)\s*=\s*([^,\n}]+)/g)) {
      if (props[name]) props[name].default = parseLiteral(val.trim().replace(/,\s*$/, ''));
    }
  }
}

/**
 * Parse all props from a .tsx file.
 */
function parseTypeScript(filePath) {
  const content = readFile(filePath);
  if (!content) return {};

  const props = {};
  const typeRegex = /type\s+(\w*(?:Props|PropTypes))\s*=\s*\{/g;
  
  for (const match of content.matchAll(typeRegex)) {
    const block = extractBracedContent(content, match.index + match[0].length);
    Object.assign(props, parseTypeBlock(block));
  }

  extractDefaults(content, props);
  return props;
}

// =============================================================================
// RUBY PARSING
// =============================================================================

const RUBY_TYPE_MAP = {
  Boolean: 'boolean', Number: 'number', String: 'string',
  Enum: 'enum', Hash: 'object', Array: 'array', HashArray: 'array',
};

function parseRubyArray(str) {
  if (str.startsWith('%w[')) {
    return str.slice(3, -1).split(/\s+/).filter(v => v && v !== 'nil');
  }
  try {
    return JSON.parse(str.replace(/'/g, '"').replace(/nil/g, 'null')).filter(v => v !== null);
  } catch {
    return str.slice(1, -1).split(',').map(v => v.trim().replace(/["']/g, '')).filter(v => v && v !== 'nil');
  }
}

/**
 * Parse all props from a .rb file.
 */
function parseRuby(filePath) {
  const content = readFile(filePath);
  if (!content) return {};

  const props = {};
  const propRegex = /prop\s+:(\w+)([^]*?)(?=\n\s*(?:prop\s+:|def\s+|private|protected|end\s*$))/gm;

  for (const [, name, body] of content.matchAll(propRegex)) {
    const camelName = snakeToCamel(name);
    if (GLOBAL_PROPS.has(camelName)) continue;

    const prop = { platforms: ['rails'] };

    const typeMatch = body.match(/type:\s*Playbook::Props::(\w+)/);
    if (typeMatch) prop.type = RUBY_TYPE_MAP[typeMatch[1]] || 'string';

    const valuesMatch = body.match(/values:\s*(%w\[[^\]]+\]|\[[^\]]+\])/);
    if (valuesMatch) {
      prop.values = parseRubyArray(valuesMatch[1]);
      prop.type = 'enum';
    }

    const defaultMatch = body.match(/default:\s*("[^"]*"|'[^']*'|true|false|nil|\d+(?:\.\d+)?)/);
    if (defaultMatch) prop.default = parseLiteral(defaultMatch[1].trim());

    props[camelName] = prop;
  }

  return props;
}

// =============================================================================
// SCHEMA GENERATION
// =============================================================================

/**
 * Merge React and Rails props into unified schema.
 */
function mergeProps(react, rails) {
  const merged = {};
  const allNames = new Set([...Object.keys(react), ...Object.keys(rails)]);

  for (const name of allNames) {
    const r = react[name];
    const rb = rails[name];

    if (r && rb) {
      merged[name] = {
        type: r.type || rb.type,
        platforms: ['react', 'rails'],
        ...(r.values || rb.values) && { values: r.values || rb.values },
      };
      
      const rd = r.default, rbd = rb.default;
      if (rd !== undefined || rbd !== undefined) {
        merged[name].default = (rd !== undefined && rbd !== undefined && JSON.stringify(rd) !== JSON.stringify(rbd))
          ? { react: rd, rails: rbd }
          : (rd ?? rbd);
      }
    } else {
      merged[name] = { ...(r || rb) };
    }
  }

  return merged;
}

/**
 * Generate usage examples for React and Rails.
 */
function generateUsage(kitName, props) {
  const pascal = snakeToPascal(kitName);
  const examples = Object.entries(props).filter(([, p]) => p.values?.length).slice(0, 2);

  const reactProps = examples.map(([n, p]) => `${n}="${p.values[0]}"`).join(' ');
  const railsProps = examples.map(([n, p]) => `${camelToSnake(n)}: "${p.values[0]}"`).join(', ');

  return {
    react: {
      import: `import { ${pascal} } from 'playbook-ui'`,
      example: `<${pascal}${reactProps ? ' ' + reactProps : ''}></${pascal}>`,
    },
    rails: {
      import: null,
      example: `<%= pb_rails("${kitName}", props: { ${railsProps || 'text: "Example"'} }) %>`,
    },
  };
}

/**
 * Generate complete kit.schema.json for a component.
 */
function generateSchema(kitName, options = {}) {
  const kitDir = path.join(CONFIG.pbKitsDir, `pb_${kitName}`);
  if (!fs.existsSync(kitDir)) return null;

  const tsxFile = path.join(kitDir, `_${kitName}.tsx`);
  const rbFile = path.join(kitDir, `${kitName}.rb`);

  const reactProps = parseTypeScript(tsxFile);
  const railsProps = parseRuby(rbFile);
  const props = mergeProps(reactProps, railsProps);

  if (Object.keys(props).length === 0) {
    if (options.verbose) console.log(`  ⏭️  ${kitName}: no props found`);
    return null;
  }

  const platforms = [];
  if (fs.existsSync(tsxFile)) platforms.push('react');
  if (fs.existsSync(rbFile)) platforms.push('rails');

  const schema = {
    $schema: CONFIG.schemaVersion,
    name: snakeToPascal(kitName),
    description: `${snakeToPascal(kitName)} component`,
    platforms,
    props,
    globalProps: true,
    usage: generateUsage(kitName, props),
  };

  return schema;
}

// =============================================================================
// KIT DISCOVERY
// =============================================================================

function getAllKitNames() {
  return fs.readdirSync(CONFIG.pbKitsDir)
    .filter(entry => 
      entry.startsWith('pb_') &&
      fs.statSync(path.join(CONFIG.pbKitsDir, entry)).isDirectory()
    )
    .map(dir => dir.replace(/^pb_/, ''))  // Remove only the leading pb_ prefix
    .filter(name => !CONFIG.excludedDirs.includes(name))
    .sort();
}

// =============================================================================
// CLI
// =============================================================================

function parseArgs() {
  const opts = { kit: null, outputDir: null, dryRun: false, verbose: false };
  
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--kit=')) opts.kit = arg.slice(6);
    else if (arg.startsWith('--output-dir=')) opts.outputDir = arg.slice(13);
    else if (arg === '--dry-run') opts.dryRun = true;
    else if (arg === '--verbose') opts.verbose = true;
    else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: yarn generate:ai-metadata [options]

Options:
  --kit=<name>       Single component (e.g., --kit=button)
  --output-dir=<dir> Custom output directory
  --dry-run          Preview without writing
  --verbose          Detailed output
  --help             Show this message
`);
      process.exit(0);
    }
  }
  return opts;
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const opts = parseArgs();

  console.log('\n🔧 Generating AI Metadata for Playbook Components');
  console.log('═'.repeat(50) + '\n');

  const kitNames = opts.kit ? [opts.kit] : getAllKitNames();
  if (opts.verbose) console.log(`📦 Found ${kitNames.length} kits to process\n`);

  let success = 0, skipped = 0;
  const errors = [];

  for (const kitName of kitNames) {
    try {
      const schema = generateSchema(kitName, { verbose: opts.verbose });
      if (!schema) { skipped++; continue; }

      const outputPath = opts.outputDir
        ? path.join(opts.outputDir, `${kitName}.schema.json`)
        : path.join(CONFIG.pbKitsDir, `pb_${kitName}`, 'kit.schema.json');

      if (opts.dryRun) {
        console.log(`📝 [DRY RUN] ${outputPath}`);
        if (opts.verbose) console.log(JSON.stringify(schema, null, 2).slice(0, 400) + '...\n');
      } else {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2) + '\n');
        console.log(`✅ ${kitName}`);
      }
      success++;
    } catch (e) {
      errors.push({ kit: kitName, error: e.message });
      if (opts.verbose) console.error(`❌ ${kitName}: ${e.message}`);
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log('📊 Summary');
  console.log('─'.repeat(50));
  console.log(`   ✅ Generated: ${success}`);
  console.log(`   ⏭️  Skipped:   ${skipped}`);
  console.log(`   ❌ Errors:    ${errors.length}`);

  if (errors.length && opts.verbose) {
    console.log('\n🔴 Errors:');
    errors.forEach(({ kit, error }) => console.log(`   • ${kit}: ${error}`));
  }

  console.log('\n✨ Done!\n');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
