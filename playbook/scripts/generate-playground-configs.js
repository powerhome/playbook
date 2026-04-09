#!/usr/bin/env node

/**
 * Generates _playground.json files for all kits.
 * 
 * Two-layer approach:
 *   1. Base config: derived from kit.schema.json (structural, safe to infer)
 *   2. Overrides: per-kit customization via docs/_playground.overrides.json
 * 
 * Usage:
 *   cd playbook
 *   yarn generate:playground-configs [options]
 * 
 * Options:
 *   --kit=name     Generate only for a specific kit (e.g., --kit=button)
 *   --overwrite    Overwrite existing _playground.json files
 *   --base-only    Skip override loading (useful for debugging base output)
 */

const fs = require('fs');
const path = require('path');

const KITS_DIR = path.join(__dirname, '../app/pb_kits/playbook');

// ============================================================================
// Utilities
// ============================================================================

/**
 * Deep merge two objects. Arrays are replaced, not concatenated.
 */
function deepMerge(base, override) {
  if (!override) return base;
  if (!base) return override;
  
  if (Array.isArray(override)) {
    return override;
  }
  
  if (typeof override !== 'object' || typeof base !== 'object') {
    return override;
  }
  
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (override[key] === undefined) continue;
    result[key] = deepMerge(base[key], override[key]);
  }
  return result;
}

function getKitName(dirName) {
  return dirName.replace(/^pb_/, '');
}

function formatComponentName(kitName) {
  return kitName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// ============================================================================
// Base Config Generator (schema-derived only)
// ============================================================================

// Props to always exclude from playground controls
const EXCLUDED_PROPS = [
  'children', 'className', 'id', 'data', 'aria', 'htmlOptions', 'wrapperClass'
];

// Components that commonly accept children content
const CHILDREN_COMPONENTS = new Set([
  'button', 'card', 'body', 'title', 'caption', 'detail', 'badge', 'pill',
  'link', 'dialog', 'popover', 'tooltip', 'flex', 'background', 'collapsible',
  'nav', 'nav_item', 'list', 'list_item', 'overlay', 'message'
]);

/**
 * Generate base playground config from kit.schema.json
 * Only includes things that are safe to infer from schema.
 */
function generateBaseConfig(schema, kitName) {
  const componentName = formatComponentName(kitName);
  const props = schema.props || {};
  
  // Filter to React-only props
  const reactProps = {};
  for (const [name, prop] of Object.entries(props)) {
    if (EXCLUDED_PROPS.includes(name)) continue;
    if (prop.platforms && !prop.platforms.includes('react')) continue;
    reactProps[name] = prop;
  }
  
  // Determine if component uses children
  const hasChildren = CHILDREN_COMPONENTS.has(kitName);
  
  // Build template
  const template = hasChildren
    ? `<${componentName}{{props}}>{{children}}</${componentName}>`
    : `<${componentName}{{props}} />`;
  
  // Extract defaults from schema
  const defaults = {};
  for (const [name, prop] of Object.entries(reactProps)) {
    if (prop.default !== undefined && prop.default !== null) {
      defaults[name] = prop.default;
    }
  }
  
  // Build base config
  const config = {
    template,
    propTargets: {},
    defaults,
  };
  
  // Add children config if applicable
  if (hasChildren) {
    config.children = {
      editable: true,
      default: `${componentName} content`,
    };
    // If text prop exists, children are typically hidden when text is set
    if (reactProps.text) {
      config.children.hideWhenPropSet = ['text'];
    }
  }
  
  // Generate minimal fallback groups (all props in one group)
  const propNames = Object.keys(reactProps);
  if (propNames.length > 0) {
    config.groups = [{ name: 'Props', props: propNames }];
  }
  
  // Single minimal preset
  config.presets = [{
    name: 'Default',
    props: {},
    ...(hasChildren ? { children: `${componentName} content` } : {}),
  }];
  
  // Empty placeholders for kit-specific authoring
  config.conditionals = {};
  config.hints = {};
  
  return config;
}

// ============================================================================
// Override Loading
// ============================================================================

/**
 * Load override file for a kit if it exists.
 * Supports: docs/_playground.overrides.json
 */
function loadOverrides(kitDir) {
  const overridePath = path.join(kitDir, 'docs', '_playground.overrides.json');
  
  if (fs.existsSync(overridePath)) {
    try {
      const content = fs.readFileSync(overridePath, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.warn(`    Warning: Failed to parse override file: ${err.message}`);
      return null;
    }
  }
  
  return null;
}

// ============================================================================
// Main Generator
// ============================================================================

function processKit(kitDir, options = {}) {
  const kitName = getKitName(path.basename(kitDir));
  const schemaPath = path.join(kitDir, 'kit.schema.json');
  const docsDir = path.join(kitDir, 'docs');
  const playgroundPath = path.join(docsDir, '_playground.json');
  
  // Check if schema exists
  if (!fs.existsSync(schemaPath)) {
    console.log(`  Skip ${kitName}: no kit.schema.json`);
    return 'skipped';
  }
  
  // Check if output exists and overwrite not enabled
  if (fs.existsSync(playgroundPath) && !options.overwrite) {
    console.log(`  Skip ${kitName}: _playground.json exists (use --overwrite)`);
    return 'skipped';
  }
  
  // Ensure docs directory exists
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  try {
    // 1. Generate base config from schema
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const baseConfig = generateBaseConfig(schema, kitName);
    
    // 2. Load overrides if present (and not disabled)
    let overrides = null;
    if (!options.baseOnly) {
      overrides = loadOverrides(kitDir);
    }
    
    // 3. Merge overrides on top of base
    const finalConfig = deepMerge(baseConfig, overrides);
    
    // 4. Write output
    fs.writeFileSync(playgroundPath, JSON.stringify(finalConfig, null, 2) + '\n');
    
    const hasOverrides = overrides !== null;
    console.log(`  Generated: ${kitName}${hasOverrides ? ' (with overrides)' : ''}`);
    return 'generated';
    
  } catch (err) {
    console.error(`  Error: ${kitName}: ${err.message}`);
    return 'error';
  }
}

function main() {
  const args = process.argv.slice(2);
  const options = {
    overwrite: args.includes('--overwrite'),
    baseOnly: args.includes('--base-only'),
    kit: args.find(a => a.startsWith('--kit='))?.split('=')[1],
  };
  
  console.log('Generating playground configs...\n');
  
  if (options.kit) console.log(`  Filter: ${options.kit}`);
  if (options.overwrite) console.log(`  Mode: overwrite`);
  if (options.baseOnly) console.log(`  Mode: base-only (no overrides)`);
  console.log('');
  
  const stats = { generated: 0, skipped: 0, errors: 0 };
  
  const kitDirs = fs.readdirSync(KITS_DIR)
    .filter(name => name.startsWith('pb_'))
    .map(name => path.join(KITS_DIR, name))
    .filter(p => fs.statSync(p).isDirectory());
  
  for (const kitDir of kitDirs) {
    const kitName = getKitName(path.basename(kitDir));
    
    if (options.kit && kitName !== options.kit) continue;
    
    const result = processKit(kitDir, options);
    if (result === 'generated') stats.generated++;
    else if (result === 'skipped') stats.skipped++;
    else stats.errors++;
  }
  
  console.log('');
  console.log(`Done. Generated: ${stats.generated}, Skipped: ${stats.skipped}, Errors: ${stats.errors}`);
}

main();
