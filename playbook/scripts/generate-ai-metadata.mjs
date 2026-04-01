#!/usr/bin/env node
/**
 * generate-ai-metadata.mjs
 * 
 * Generates AI-friendly metadata for Playbook components by parsing:
 * - TypeScript prop types from React components (regex-based)
 * - Ruby prop definitions from Rails components
 * - Component metadata from menu.yml
 * 
 * Outputs kit.schema.json files for each component.
 * 
 * Usage:
 *   node scripts/generate-ai-metadata.mjs [--kit=button] [--output-dir=dist/ai]
 * 
 * Options:
 *   --kit=<name>       Generate schema for a single kit (e.g., --kit=button)
 *   --output-dir=<dir> Output directory (default: outputs to each kit folder)
 *   --dry-run          Print output without writing files
 *   --verbose          Show detailed logging
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  pbKitsDir: path.resolve(__dirname, '../app/pb_kits/playbook'),
  menuYmlPath: path.resolve(__dirname, '../../playbook-website/config/menu.yml'),
  schemaVersion: 'https://playbook.powerapp.cloud/schemas/kit-schema.json',
};

// Global props to filter out from component-specific props
const GLOBAL_PROP_NAMES = new Set([
  'minHeight', 'maxHeight', 'height', 'left', 'bottom', 'right', 'top', 'hover',
  'zIndex', 'verticalAlign', 'truncate', 'textAlign', 'shadow', 'position',
  'paddingRight', 'paddingLeft', 'paddingTop', 'paddingBottom', 'paddingX', 'paddingY', 'padding',
  'overflowX', 'overflowY', 'overflow', 'order', 'numberSpacing',
  'rowGap', 'columnGap', 'gap', 'maxWidth', 'minWidth', 'width',
  'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'marginX', 'marginY', 'margin',
  'lineHeight', 'justifySelf', 'justifyContent', 'flexWrap', 'flexShrink', 'flexGrow',
  'flexDirection', 'flex', 'display', 'dark', 'cursor', 'borderRadius',
  'alignSelf', 'alignItems', 'alignContent', 'groupHover',
  // Common HTML/React props
  'aria', 'data', 'htmlOptions', 'id', 'className', 'children', 'key', 'ref',
]);

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = {
    kit: null,
    outputDir: null,
    dryRun: false,
    verbose: false,
  };
  
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--kit=')) args.kit = arg.split('=')[1];
    else if (arg.startsWith('--output-dir=')) args.outputDir = arg.split('=')[1];
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--verbose') args.verbose = true;
  });
  
  return args;
}

/**
 * Simple YAML parser for menu.yml (handles the basic structure)
 */
function parseSimpleYaml(content) {
  const result = { kits: [] };
  let currentCategory = null;
  let currentComponent = null;
  let inComponents = false;
  let indent = 0;
  
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Track category
    if (trimmed.startsWith('- category:')) {
      currentCategory = {
        category: trimmed.split(':')[1].trim(),
        description: '',
        components: [],
      };
      result.kits.push(currentCategory);
      currentComponent = null;
      inComponents = false;
    }
    // Track components section
    else if (trimmed === 'components:' && currentCategory) {
      inComponents = true;
    }
    // Track component
    else if (trimmed.startsWith('- name:') && currentCategory && inComponents) {
      currentComponent = {
        name: trimmed.split(':')[1].trim(),
      };
      currentCategory.components.push(currentComponent);
    }
    // Parse component properties
    else if (currentComponent && trimmed.includes(':') && !trimmed.startsWith('-')) {
      const [key, ...valueParts] = trimmed.split(':');
      const value = valueParts.join(':').trim();
      if (key && value) {
        currentComponent[key.trim()] = value;
      }
    }
  }
  
  return result;
}

/**
 * Load and parse menu.yml to get component metadata
 */
function loadMenuYml() {
  try {
    const content = fs.readFileSync(CONFIG.menuYmlPath, 'utf8');
    return parseSimpleYaml(content);
  } catch (e) {
    console.warn('Warning: Could not load menu.yml:', e.message);
    return { kits: [] };
  }
}

/**
 * Find component metadata in menu.yml
 */
function findComponentInMenu(menu, kitName) {
  for (const category of menu.kits || []) {
    for (const component of category.components || []) {
      if (component.name === kitName) {
        return {
          ...component,
          category: category.category,
          categoryDescription: category.description,
        };
      }
    }
  }
  return null;
}

/**
 * Parse TypeScript props using regex
 */
function parseTypeScriptProps(tsxPath) {
  if (!fs.existsSync(tsxPath)) return {};
  
  const content = fs.readFileSync(tsxPath, 'utf8');
  const props = {};
  
  // Find the type definition block - handle multiline and nested braces
  // Match: type SomethingProps = { ... } & GlobalProps
  const typeBlockRegex = /type\s+(\w*(?:Props|PropTypes))\s*=\s*\{/g;
  
  let typeMatch;
  while ((typeMatch = typeBlockRegex.exec(content)) !== null) {
    const startIndex = typeMatch.index + typeMatch[0].length;
    
    // Find matching closing brace, handling nested braces
    let braceCount = 1;
    let endIndex = startIndex;
    
    while (braceCount > 0 && endIndex < content.length) {
      const char = content[endIndex];
      if (char === '{') braceCount++;
      else if (char === '}') braceCount--;
      endIndex++;
    }
    
    const propsBlock = content.slice(startIndex, endIndex - 1);
    
    // Parse props line by line for better accuracy
    const lines = propsBlock.split('\n');
    let currentProp = null;
    let currentType = '';
    let braceDepth = 0;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;
      
      // Track brace depth for multi-line types
      braceDepth += (trimmed.match(/\{/g) || []).length;
      braceDepth -= (trimmed.match(/\}/g) || []).length;
      
      // Check for prop definition: name?: type,
      const propMatch = trimmed.match(/^(\w+)\??:\s*(.*)$/);
      
      if (propMatch && braceDepth <= 0) {
        // Save previous prop
        if (currentProp && currentType) {
          processTsProp(currentProp, currentType, props);
        }
        
        currentProp = propMatch[1];
        currentType = propMatch[2].replace(/,\s*$/, '');
        
        // Reset brace depth if type is complete
        if (!currentType.includes('{') || currentType.includes('}')) {
          braceDepth = 0;
        }
      } else if (currentProp && braceDepth > 0) {
        // Continue multi-line type
        currentType += ' ' + trimmed.replace(/,\s*$/, '');
      } else if (propMatch && braceDepth > 0) {
        // This is inside a nested object, skip
        continue;
      }
    }
    
    // Don't forget the last prop
    if (currentProp && currentType) {
      processTsProp(currentProp, currentType, props);
    }
  }
  
  // Find default values from destructuring
  const defaultsRegex = /(?:const|let)\s*\{([^}]+)\}\s*=\s*(?:props|this\.props)/g;
  let defaultsMatch;
  while ((defaultsMatch = defaultsRegex.exec(content)) !== null) {
    const destructuring = defaultsMatch[1];
    
    // Match: propName = defaultValue
    const defaultRegex = /(\w+)\s*=\s*([^,\n}]+)/g;
    let defMatch;
    while ((defMatch = defaultRegex.exec(destructuring)) !== null) {
      const [, propName, defaultVal] = defMatch;
      const cleanDefault = defaultVal.trim().replace(/,\s*$/, '');
      if (props[propName] && cleanDefault) {
        props[propName].default = parseDefaultValue(cleanDefault);
      }
    }
  }
  
  return props;
}

/**
 * Process a TypeScript prop and add to props object
 */
function processTsProp(name, typeStr, props) {
  // Skip global props
  if (GLOBAL_PROP_NAMES.has(name)) return;
  
  const typeInfo = parseTypeString(typeStr.trim());
  
  props[name] = {
    type: typeInfo.type,
    platforms: ['react'],
  };
  
  if (typeInfo.values) {
    props[name].values = typeInfo.values;
  }
}

/**
 * Parse TypeScript type string into schema format
 */
function parseTypeString(typeStr) {
  if (!typeStr) return { type: 'any' };
  
  // Clean up the type string
  typeStr = typeStr.replace(/\s+/g, ' ').trim();
  
  // Handle union types with literal strings: "primary" | "secondary" | "link"
  if (typeStr.includes('|')) {
    const parts = typeStr.split('|').map(p => p.trim());
    
    // Check if all parts are string literals
    const allLiterals = parts.every(p => 
      (p.startsWith('"') && p.endsWith('"')) || 
      (p.startsWith("'") && p.endsWith("'")) ||
      p === 'null' || p === 'undefined' ||
      !isNaN(Number(p))
    );
    
    if (allLiterals) {
      const values = parts
        .filter(p => p !== 'null' && p !== 'undefined')
        .map(p => {
          if (p.startsWith('"') || p.startsWith("'")) {
            return p.slice(1, -1);
          }
          if (!isNaN(Number(p))) return Number(p);
          return p;
        });
      
      return { type: 'enum', values };
    }
    
    // Mixed union type
    return { type: typeStr };
  }
  
  // Handle common types
  if (typeStr === 'string') return { type: 'string' };
  if (typeStr === 'number') return { type: 'number' };
  if (typeStr === 'boolean') return { type: 'boolean' };
  if (typeStr.includes('React') || typeStr.includes('Node') || typeStr.includes('Element')) {
    return { type: 'ReactNode' };
  }
  if (typeStr.includes('=>') || typeStr.startsWith('(') || typeStr.includes('EventHandler')) {
    return { type: 'function' };
  }
  if (typeStr.startsWith('{')) return { type: 'object' };
  if (typeStr.endsWith('[]') || typeStr.startsWith('Array')) return { type: 'array' };
  
  return { type: typeStr };
}

/**
 * Parse Ruby prop definitions from a .rb file
 */
function parseRubyProps(rbPath) {
  if (!fs.existsSync(rbPath)) return {};
  
  const content = fs.readFileSync(rbPath, 'utf8');
  const props = {};
  
  // Match complete prop definitions including multiline
  // We'll use a regex that captures from 'prop :name' to the next 'prop :' or 'def ' or end of class
  const propBlockRegex = /prop\s+:(\w+)([^]*?)(?=\n\s*(?:prop\s+:|def\s+|private|protected|end\s*$))/gm;
  
  let match;
  while ((match = propBlockRegex.exec(content)) !== null) {
    const propName = match[1];
    const propBody = match[2];
    
    // Skip if already processed or is a global prop
    const camelName = snakeToCamel(propName);
    if (GLOBAL_PROP_NAMES.has(camelName)) continue;
    
    const prop = {
      platforms: ['rails'],
    };
    
    // Extract type
    const typeMatch = propBody.match(/type:\s*Playbook::Props::(\w+)/);
    if (typeMatch) {
      prop.type = mapRubyType(typeMatch[1]);
    }
    
    // Extract values - handle %w[...] and [...] formats
    const valuesMatch = propBody.match(/values:\s*(%w\[[^\]]+\]|\[[^\]]+\])/);
    if (valuesMatch) {
      prop.values = parseRubyValues(valuesMatch[1]);
      prop.type = 'enum';
    }
    
    // Extract default - be more precise to avoid capturing into next line
    const defaultMatch = propBody.match(/default:\s*("[^"]*"|'[^']*'|true|false|nil|\d+(?:\.\d+)?)/);
    if (defaultMatch) {
      prop.default = parseRubyDefault(defaultMatch[1].trim());
    }
    
    props[camelName] = prop;
  }
  
  return props;
}

/**
 * Map Ruby type to JSON schema type
 */
function mapRubyType(rubyType) {
  const typeMap = {
    'Boolean': 'boolean',
    'Number': 'number',
    'String': 'string',
    'Enum': 'enum',
    'Hash': 'object',
    'Array': 'array',
    'HashArray': 'array',
  };
  return typeMap[rubyType] || 'string';
}

/**
 * Parse Ruby values array: %w[a b c] or ["a", "b", "c"]
 */
function parseRubyValues(valuesStr) {
  // Handle %w[...] format
  if (valuesStr.startsWith('%w[')) {
    return valuesStr.slice(3, -1).split(/\s+/).filter(v => v && v !== 'nil');
  }
  // Handle ["...", "..."] format
  try {
    const cleaned = valuesStr
      .replace(/'/g, '"')
      .replace(/nil/g, 'null');
    return JSON.parse(cleaned).filter(v => v !== null);
  } catch {
    return valuesStr.slice(1, -1).split(',')
      .map(v => v.trim().replace(/["']/g, ''))
      .filter(v => v && v !== 'nil');
  }
}

/**
 * Parse Ruby default value
 */
function parseRubyDefault(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'nil' || val === 'null') return null;
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
  if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1);
  if (!isNaN(val) && val !== '') return Number(val);
  return val;
}

/**
 * Parse default value from JavaScript/TypeScript
 */
function parseDefaultValue(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === 'undefined') return null;
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
  if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1);
  if (!isNaN(val) && val !== '') return Number(val);
  // Handle simple objects/arrays
  if (val === '{}' || val === '[]') return val === '{}' ? {} : [];
  return val;
}

/**
 * Convert snake_case to camelCase
 */
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert camelCase to snake_case
 */
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Merge React and Rails props into unified schema
 */
function mergeProps(reactProps, railsProps) {
  const merged = {};
  const allKeys = new Set([...Object.keys(reactProps), ...Object.keys(railsProps)]);
  
  for (const key of allKeys) {
    const react = reactProps[key];
    const rails = railsProps[key];
    
    if (react && rails) {
      // Both platforms have this prop - merge them
      merged[key] = {
        type: react.type || rails.type,
        platforms: ['react', 'rails'],
      };
      
      // Merge values (prefer more specific)
      if (react.values || rails.values) {
        merged[key].values = react.values || rails.values;
      }
      
      // Handle defaults
      const reactDefault = react.default;
      const railsDefault = rails.default;
      
      if (reactDefault !== undefined && railsDefault !== undefined) {
        if (JSON.stringify(reactDefault) !== JSON.stringify(railsDefault)) {
          merged[key].default = { react: reactDefault, rails: railsDefault };
        } else {
          merged[key].default = reactDefault;
        }
      } else if (reactDefault !== undefined) {
        merged[key].default = reactDefault;
      } else if (railsDefault !== undefined) {
        merged[key].default = railsDefault;
      }
      
      // Merge description
      if (react.description || rails.description) {
        merged[key].description = react.description || rails.description;
      }
    } else if (react) {
      merged[key] = { ...react };
    } else {
      merged[key] = { ...rails };
    }
    
    // Clean up undefined/null values
    Object.keys(merged[key]).forEach(k => {
      if (merged[key][k] === undefined) delete merged[key][k];
    });
  }
  
  return merged;
}

/**
 * Generate usage examples for React and Rails
 */
function generateUsageExamples(kitName, props) {
  const componentName = kitName.split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  const snakeName = kitName;
  
  // Find example props
  const exampleProps = Object.entries(props)
    .filter(([_, p]) => p.values && p.values.length > 0)
    .slice(0, 2);
  
  const reactPropsStr = exampleProps
    .map(([name, p]) => `${name}="${p.values[0]}"`)
    .join(' ');
  
  const railsPropsStr = exampleProps
    .map(([name, p]) => `${camelToSnake(name)}: "${p.values[0]}"`)
    .join(', ');
  
  return {
    react: {
      import: `import { ${componentName} } from 'playbook-ui'`,
      example: `<${componentName}${reactPropsStr ? ' ' + reactPropsStr : ''}></${componentName}>`,
    },
    rails: {
      import: null,
      example: `<%= pb_rails("${snakeName}", props: { ${railsPropsStr || 'text: "Example"'} }) %>`,
    },
  };
}

/**
 * Generate kit.schema.json for a single component
 */
function generateKitSchema(kitName, options = {}) {
  const kitDir = path.join(CONFIG.pbKitsDir, `pb_${kitName}`);
  
  if (!fs.existsSync(kitDir)) {
    if (options.verbose) console.log(`  Skipping ${kitName}: directory not found`);
    return null;
  }
  
  // Find TypeScript file
  const tsxFile = path.join(kitDir, `_${kitName}.tsx`);
  const reactProps = parseTypeScriptProps(tsxFile);
  
  // Find Ruby file
  const rbFile = path.join(kitDir, `${kitName}.rb`);
  const railsProps = parseRubyProps(rbFile);
  
  // Merge props
  const mergedProps = mergeProps(reactProps, railsProps);
  
  if (Object.keys(mergedProps).length === 0) {
    if (options.verbose) console.log(`  Skipping ${kitName}: no props found`);
    return null;
  }
  
  // Get menu.yml metadata
  const menu = loadMenuYml();
  const menuData = findComponentInMenu(menu, kitName);
  
  // Determine platforms
  const platforms = [];
  if (fs.existsSync(tsxFile)) platforms.push('react');
  if (fs.existsSync(rbFile)) platforms.push('rails');
  
  // Check menu data for additional platforms
  if (menuData?.platforms) {
    const menuPlatforms = menuData.platforms;
    if (typeof menuPlatforms === 'string') {
      // Handle YAML anchor references
      if (menuPlatforms.includes('swift')) platforms.push('swift');
    }
  }
  
  // Build component name (PascalCase)
  const componentName = kitName.split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  
  // Build schema
  const schema = {
    $schema: CONFIG.schemaVersion,
    name: componentName,
    description: menuData?.description || `${componentName} component`,
    platforms: [...new Set(platforms)],
    props: mergedProps,
    globalProps: true,
    usage: generateUsageExamples(kitName, mergedProps),
  };
  
  // Add related components if available
  if (menuData?.related_components) {
    try {
      // Parse YAML array
      const related = menuData.related_components;
      if (typeof related === 'string') {
        schema.relatedComponents = related.replace(/[\[\]]/g, '').split(',').map(s => s.trim());
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }
  
  return schema;
}

/**
 * Get all kit directories
 */
function getAllKits() {
  const dirs = fs.readdirSync(CONFIG.pbKitsDir);
  return dirs
    .filter(dir => {
      if (!dir.startsWith('pb_')) return false;
      const fullPath = path.join(CONFIG.pbKitsDir, dir);
      if (!fs.statSync(fullPath).isDirectory()) return false;
      return true;
    })
    .map(dir => dir.replace('pb_', ''))
    .filter(name => {
      // Exclude utility/doc folders
      if (name === 'docs' || name === 'utilities') return false;
      // Skip chart components with pb_pb_ prefix issue
      if (name.startsWith('pb_')) return false;
      return true;
    })
    .sort();
}

/**
 * Main function
 */
async function main() {
  const args = parseArgs();
  
  console.log('🔧 Generating AI metadata for Playbook components...\n');
  
  // Determine which kits to process
  const kits = args.kit ? [args.kit] : getAllKits();
  
  let successCount = 0;
  let skipCount = 0;
  const errors = [];
  
  for (const kit of kits) {
    try {
      const schema = generateKitSchema(kit, { verbose: args.verbose });
      
      if (!schema) {
        skipCount++;
        continue;
      }
      
      // Determine output path
      const outputPath = args.outputDir
        ? path.join(args.outputDir, `${kit}.schema.json`)
        : path.join(CONFIG.pbKitsDir, `pb_${kit}`, 'kit.schema.json');
      
      if (args.dryRun) {
        console.log(`[DRY RUN] Would write: ${outputPath}`);
        if (args.verbose) {
          console.log(JSON.stringify(schema, null, 2).slice(0, 500) + '...\n');
        }
      } else {
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2) + '\n');
        console.log(`✅ ${kit}`);
      }
      
      successCount++;
    } catch (e) {
      errors.push({ kit, error: e.message });
      if (args.verbose) {
        console.error(`❌ ${kit}: ${e.message}`);
      }
    }
  }
  
  // Summary
  console.log(`\n📊 Summary:`);
  console.log(`   Generated: ${successCount}`);
  console.log(`   Skipped:   ${skipCount}`);
  console.log(`   Errors:    ${errors.length}`);
  
  if (errors.length > 0 && args.verbose) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(`   - ${e.kit}: ${e.error}`));
  }
  
  console.log('\n✨ Done!');
}

main().catch(console.error);
