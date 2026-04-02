#!/usr/bin/env node
/**
 * Generate AI-Friendly Metadata for Playbook Components
 * ======================================================
 * 
 * This script generates kit.schema.json files for each Playbook component by:
 *   1. Parsing TypeScript (.tsx) files for React prop definitions
 *   2. Parsing Ruby (.rb) files for Rails prop definitions  
 *   3. Merging props from both platforms into a unified schema
 *   4. Adding metadata from menu.yml (descriptions, related components)
 * 
 * Limitations:
 *   - TypeScript parsing uses regex, not a full AST parser
 *   - Only parses `type XProps = {}` patterns, not interfaces
 *   - May miss complex composed/extended types
 *   - Imported prop types are not followed
 * 
 * Usage:
 *   yarn generate:ai-metadata                    # Generate all schemas
 *   yarn generate:ai-metadata --kit=button       # Generate single component
 *   yarn generate:ai-metadata --dry-run          # Preview without writing
 *   yarn generate:ai-metadata --verbose          # Show detailed output
 *   yarn generate:ai-metadata --output-dir=dist  # Custom output directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { getGlobalPropNames } from './lib/global-props-parser.mjs';

// =============================================================================
// CONFIGURATION
// =============================================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  // Path to Playbook component directories
  pbKitsDir: path.resolve(__dirname, '../app/pb_kits/playbook'),
  
  // Path to menu.yml for component metadata
  menuYmlPath: path.resolve(__dirname, '../../playbook-website/config/menu.yml'),
  
  // Schema version URL (for $schema field)
  schemaVersion: 'https://playbook.powerapp.cloud/schemas/kit-schema.json',
  
  // Directories to exclude from processing
  excludedDirs: ['docs', 'utilities'],
};

/**
 * Global props dynamically loaded from globalProps.ts
 * These are filtered out from component-specific prop definitions.
 */
let GLOBAL_PROPS;
try {
  GLOBAL_PROPS = getGlobalPropNames();
  // Add common HTML/React props that aren't in globalProps.ts
  ['aria', 'data', 'htmlOptions', 'id', 'className', 'children', 'key', 'ref'].forEach(p => GLOBAL_PROPS.add(p));
} catch (e) {
  console.warn('⚠️  Could not load global props dynamically, using fallback list');
  GLOBAL_PROPS = new Set([
    'display', 'position', 'top', 'right', 'bottom', 'left', 'zIndex',
    'width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight',
    'flex', 'flexDirection', 'flexWrap', 'flexGrow', 'flexShrink',
    'justifyContent', 'justifySelf', 'alignItems', 'alignContent', 'alignSelf',
    'order', 'gap', 'rowGap', 'columnGap',
    'margin', 'marginX', 'marginY', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'padding', 'paddingX', 'paddingY', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'textAlign', 'verticalAlign', 'lineHeight', 'truncate', 'numberSpacing',
    'shadow', 'borderRadius', 'cursor', 'overflow', 'overflowX', 'overflowY',
    'hover', 'groupHover', 'dark',
    'aria', 'data', 'htmlOptions', 'id', 'className', 'children', 'key', 'ref',
  ]);
}

// =============================================================================
// CLI ARGUMENT PARSING
// =============================================================================

/**
 * Parse command line arguments into an options object.
 * 
 * @returns {{ kit: string|null, outputDir: string|null, dryRun: boolean, verbose: boolean }}
 */
function parseCliArgs() {
  const options = {
    kit: null, 
    outputDir: null,
    dryRun: false,
    verbose: false,
  };

  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--kit=')) {
      options.kit = arg.slice(6);
    } else if (arg.startsWith('--output-dir=')) {
      options.outputDir = arg.slice(13);
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--verbose') {
      options.verbose = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Generate AI-Friendly Metadata for Playbook Components

Usage:
  yarn generate:ai-metadata [options]

Options:
  --kit=<name>       Generate schema for a single kit (e.g., --kit=button)
  --output-dir=<dir> Output directory (default: each kit's folder)
  --dry-run          Preview output without writing files
  --verbose          Show detailed logging
  --help, -h         Show this help message

Examples:
  yarn generate:ai-metadata                    # Generate all schemas
  yarn generate:ai-metadata --kit=button       # Generate only button schema
  yarn generate:ai-metadata --dry-run --verbose # Preview with details
`);
}

// =============================================================================
// YAML PARSING (Simple parser for menu.yml)
// =============================================================================

/**
 * Parse the menu.yml file to extract component metadata.
 * This is a simplified parser that handles the specific structure of menu.yml.
 * 
 * @returns {{ kits: Array<{ category: string, components: Array }> }}
 */
function loadMenuYml() {
  try {
    const content = fs.readFileSync(CONFIG.menuYmlPath, 'utf8');
    return parseMenuYaml(content);
  } catch (error) {
    console.warn('⚠️  Could not load menu.yml:', error.message);
    return { kits: [] };
  }
}

/**
 * Simple YAML parser tailored for menu.yml structure.
 * Handles categories, components, and their properties.
 */
function parseMenuYaml(content) {
  // Use js-yaml for proper YAML parsing (supports anchors, aliases, etc.)
  const parsed = yaml.load(content);
  
  // Transform to our expected format
  const result = { kits: [] };
  
  if (Array.isArray(parsed)) {
    for (const category of parsed) {
      if (category.category) {
        result.kits.push({
          category: category.category,
          description: category.description || '',
          components: (category.components || []).map(comp => ({
            name: comp.name,
            description: comp.description || '',
            schema_path: comp.schema_path || null,
            related_components: comp.related_components || null,
            props_summary: comp.props_summary || null,
            platforms: comp.platforms || null,
            subcomponents: comp.subcomponents || null,
            status: comp.status || null,
          })),
        });
      }
    }
  }
  
  return result;
}

/**
 * Find a component's metadata in the parsed menu.yml data.
 * 
 * @param {object} menu - Parsed menu.yml data
 * @param {string} kitName - Component name (e.g., "button")
 * @returns {object|null} Component metadata or null if not found
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

// =============================================================================
// TYPESCRIPT PROP PARSING
// =============================================================================

/**
 * Parse TypeScript prop definitions from a .tsx component file.
 * 
 * Looks for type definitions like:
 *   type ButtonProps = {
 *     variant?: "primary" | "secondary",
 *     disabled?: boolean,
 *   } & GlobalProps
 * 
 * @param {string} filePath - Path to the .tsx file
 * @returns {object} Props object with name -> { type, platforms, values?, default? }
 */
function parseTypeScriptProps(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const content = fs.readFileSync(filePath, 'utf8');
  const props = {};

  // Find type definitions ending in Props or PropTypes
  const typeDefPattern = /type\s+(\w*(?:Props|PropTypes))\s*=\s*\{/g;
  let match;

  while ((match = typeDefPattern.exec(content)) !== null) {
    const propsBlock = extractBalancedBraces(content, match.index + match[0].length);
    const extractedProps = parsePropsBlock(propsBlock);
    
    // Add extracted props (later definitions override earlier ones)
    Object.assign(props, extractedProps);
  }

  // Extract default values from destructuring patterns
  extractDefaultValues(content, props);

  return props;
}

/**
 * Extract content between balanced braces starting at a position.
 * Handles nested braces correctly.
 */
function extractBalancedBraces(content, startIndex) {
  let braceCount = 1;
  let endIndex = startIndex;

  while (braceCount > 0 && endIndex < content.length) {
    const char = content[endIndex];
    if (char === '{') braceCount++;
    else if (char === '}') braceCount--;
    endIndex++;
  }

  return content.slice(startIndex, endIndex - 1);
}

/**
 * Parse a TypeScript props block into individual prop definitions.
 */
function parsePropsBlock(propsBlock) {
  const props = {};
  const lines = propsBlock.split('\n');
  
  let currentPropName = null;
  let currentPropType = '';
  let braceDepth = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

    // Track nested brace depth for multi-line types
    braceDepth += (trimmed.match(/\{/g) || []).length;
    braceDepth -= (trimmed.match(/\}/g) || []).length;

    // Match prop definition: propName?: TypeExpression,
    const propMatch = trimmed.match(/^(\w+)\??:\s*(.*)$/);

    if (propMatch && braceDepth <= 0) {
      // Save previous prop if exists
      if (currentPropName && currentPropType) {
        addPropToCollection(currentPropName, currentPropType, props);
      }

      currentPropName = propMatch[1];
      currentPropType = propMatch[2].replace(/,\s*$/, '');

      // Reset brace depth if type is complete on this line
      if (!currentPropType.includes('{') || currentPropType.includes('}')) {
        braceDepth = 0;
      }
    } else if (currentPropName && braceDepth > 0) {
      // Continue accumulating multi-line type
      currentPropType += ' ' + trimmed.replace(/,\s*$/, '');
    }
  }

  // Don't forget the last prop
  if (currentPropName && currentPropType) {
    addPropToCollection(currentPropName, currentPropType, props);
  }

  return props;
}

/**
 * Add a prop to the collection after parsing its type.
 */
function addPropToCollection(name, typeString, props) {
  // Skip global props - they're inherited separately
  if (GLOBAL_PROPS.has(name)) return;

  const typeInfo = parseTypeScriptType(typeString.trim());

  props[name] = {
    type: typeInfo.type,
    platforms: ['react'],
    ...(typeInfo.values && { values: typeInfo.values }),
  };
}

/**
 * Parse a TypeScript type string into a simplified schema format.
 * 
 * Examples:
 *   "primary" | "secondary"  -> { type: "enum", values: ["primary", "secondary"] }
 *   string                   -> { type: "string" }
 *   boolean                  -> { type: "boolean" }
 *   () => void               -> { type: "function" }
 */
function parseTypeScriptType(typeStr) {
  if (!typeStr) return { type: 'any' };

  // Normalize whitespace
  typeStr = typeStr.replace(/\s+/g, ' ').trim();

  // Handle union types: "a" | "b" | "c"
  if (typeStr.includes('|')) {
    const parts = typeStr.split('|').map(p => p.trim());

    // Check if all parts are literal values (strings, numbers, null, undefined)
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
          // Remove quotes from string literals
          if (p.startsWith('"') || p.startsWith("'")) return p.slice(1, -1);
          // Convert numeric literals to numbers
          if (!isNaN(Number(p))) return Number(p);
          return p;
        });

      return { type: 'enum', values };
    }

    // Mixed union type - keep as-is
    return { type: typeStr };
  }

  // Map common TypeScript types to simpler names
  const typeMap = {
    'string': 'string',
    'number': 'number',
    'boolean': 'boolean',
  };

  if (typeMap[typeStr]) return { type: typeMap[typeStr] };

  // React-specific types
  if (typeStr.includes('React') || typeStr.includes('Node') || typeStr.includes('Element')) {
    return { type: 'ReactNode' };
  }

  // Function types
  if (typeStr.includes('=>') || typeStr.startsWith('(') || typeStr.includes('EventHandler')) {
    return { type: 'function' };
  }

  // Object and array types
  if (typeStr.startsWith('{')) return { type: 'object' };
  if (typeStr.endsWith('[]') || typeStr.startsWith('Array')) return { type: 'array' };

  // Return as-is for complex types
  return { type: typeStr };
}

/**
 * Extract default values from destructuring patterns in the component.
 * 
 * Looks for patterns like:
 *   const { variant = "primary", disabled = false } = props
 */
function extractDefaultValues(content, props) {
  const destructuringPattern = /(?:const|let)\s*\{([^}]+)\}\s*=\s*(?:props|this\.props)/g;
  let match;

  while ((match = destructuringPattern.exec(content)) !== null) {
    const destructuring = match[1];

    // Match: propName = defaultValue
    const defaultPattern = /(\w+)\s*=\s*([^,\n}]+)/g;
    let defaultMatch;

    while ((defaultMatch = defaultPattern.exec(destructuring)) !== null) {
      const [, propName, defaultValue] = defaultMatch;
      const cleanValue = defaultValue.trim().replace(/,\s*$/, '');

      if (props[propName] && cleanValue) {
        props[propName].default = parseJsValue(cleanValue);
      }
    }
  }
}

// =============================================================================
// RUBY PROP PARSING
// =============================================================================

/**
 * Parse Ruby prop definitions from a Rails component .rb file.
 * 
 * Looks for definitions like:
 *   prop :variant, type: Playbook::Props::Enum,
 *        values: %w[primary secondary],
 *        default: "primary"
 * 
 * @param {string} filePath - Path to the .rb file
 * @returns {object} Props object with camelCase names
 */
function parseRubyProps(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const content = fs.readFileSync(filePath, 'utf8');
  const props = {};

  // Match prop definitions - capture from 'prop :name' until next prop/def/end
  const propPattern = /prop\s+:(\w+)([^]*?)(?=\n\s*(?:prop\s+:|def\s+|private|protected|end\s*$))/gm;
  let match;

  while ((match = propPattern.exec(content)) !== null) {
    const propName = match[1];
    const propBody = match[2];

    // Convert snake_case to camelCase
    const camelName = snakeToCamel(propName);

    // Skip global props
    if (GLOBAL_PROPS.has(camelName)) continue;

    const prop = {
      platforms: ['rails'],
    };

    // Extract type: Playbook::Props::Boolean, String, Enum, etc.
    const typeMatch = propBody.match(/type:\s*Playbook::Props::(\w+)/);
    if (typeMatch) {
      prop.type = mapRubyTypeToSchema(typeMatch[1]);
    }

    // Extract values: %w[a b c] or ["a", "b", "c"]
    const valuesMatch = propBody.match(/values:\s*(%w\[[^\]]+\]|\[[^\]]+\])/);
    if (valuesMatch) {
      prop.values = parseRubyArray(valuesMatch[1]);
      prop.type = 'enum';
    }

    // Extract default value
    const defaultMatch = propBody.match(/default:\s*("[^"]*"|'[^']*'|true|false|nil|\d+(?:\.\d+)?)/);
    if (defaultMatch) {
      prop.default = parseRubyValue(defaultMatch[1].trim());
    }

    props[camelName] = prop;
  }

  return props;
}

/**
 * Map Ruby Playbook prop types to schema types.
 */
function mapRubyTypeToSchema(rubyType) {
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
 * Parse Ruby array syntax: %w[a b c] or ["a", "b"]
 */
function parseRubyArray(str) {
  // %w[word list] syntax
  if (str.startsWith('%w[')) {
    return str.slice(3, -1).split(/\s+/).filter(v => v && v !== 'nil');
  }

  // Standard array syntax
  try {
    const normalized = str.replace(/'/g, '"').replace(/nil/g, 'null');
    return JSON.parse(normalized).filter(v => v !== null);
  } catch {
    // Fallback: split by comma and clean up
    return str.slice(1, -1)
      .split(',')
      .map(v => v.trim().replace(/["']/g, ''))
      .filter(v => v && v !== 'nil');
  }
}

/**
 * Parse a Ruby value into a JavaScript value.
 */
function parseRubyValue(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'nil') return null;
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
  if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1);
  if (!isNaN(val) && val !== '') return Number(val);
  return val;
}

// =============================================================================
// VALUE PARSING UTILITIES
// =============================================================================

/**
 * Parse a JavaScript/TypeScript literal value.
 */
function parseJsValue(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null' || val === 'undefined') return null;
  if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
  if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1);
  if (!isNaN(val) && val !== '') return Number(val);
  if (val === '{}') return {};
  if (val === '[]') return [];
  return val;
}

/**
 * Convert snake_case to camelCase.
 */
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert camelCase to snake_case.
 */
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Convert snake_case to PascalCase.
 */
function snakeToPascal(str) {
  return str.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// =============================================================================
// SCHEMA GENERATION
// =============================================================================

/**
 * Merge React and Rails props into a unified schema.
 * 
 * When a prop exists in both platforms:
 *   - Combines platforms array
 *   - Uses React type if available (usually more specific)
 *   - Handles differing defaults between platforms
 */
function mergeProps(reactProps, railsProps) {
  const merged = {};
  const allPropNames = new Set([
    ...Object.keys(reactProps),
    ...Object.keys(railsProps),
  ]);

  for (const name of allPropNames) {
    const reactProp = reactProps[name];
    const railsProp = railsProps[name];

    if (reactProp && railsProp) {
      // Prop exists in both platforms
      merged[name] = {
        type: reactProp.type || railsProp.type,
        platforms: ['react', 'rails'],
      };

      // Use values from whichever has them (prefer React)
      if (reactProp.values || railsProp.values) {
        merged[name].values = reactProp.values || railsProp.values;
      }

      // Handle defaults - note if they differ between platforms
      const reactDefault = reactProp.default;
      const railsDefault = railsProp.default;

      if (reactDefault !== undefined && railsDefault !== undefined) {
        if (JSON.stringify(reactDefault) !== JSON.stringify(railsDefault)) {
          // Defaults differ - document both
          merged[name].default = { react: reactDefault, rails: railsDefault };
        } else {
          merged[name].default = reactDefault;
        }
      } else {
        merged[name].default = reactDefault ?? railsDefault;
      }

      // Include description if available
      if (reactProp.description || railsProp.description) {
        merged[name].description = reactProp.description || railsProp.description;
      }
    } else {
      // Prop exists in only one platform
      merged[name] = { ...(reactProp || railsProp) };
    }

    // Clean up undefined values
    for (const key of Object.keys(merged[name])) {
      if (merged[name][key] === undefined) {
        delete merged[name][key];
      }
    }
  }

  return merged;
}

/**
 * Generate usage examples for both React and Rails.
 */
function generateUsageExamples(kitName, props) {
  const componentName = snakeToPascal(kitName);

  // Find props with enum values for example usage
  const exampleProps = Object.entries(props)
    .filter(([_, p]) => p.values?.length > 0)
    .slice(0, 2);

  // React example
  const reactPropsStr = exampleProps
    .map(([name, p]) => `${name}="${p.values[0]}"`)
    .join(' ');

  // Rails example
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
      example: `<%= pb_rails("${kitName}", props: { ${railsPropsStr || 'text: "Example"'} }) %>`,
    },
  };
}

/**
 * Generate a complete kit.schema.json for a component.
 */
function generateKitSchema(kitName, options = {}) {
  const kitDir = path.join(CONFIG.pbKitsDir, `pb_${kitName}`);

  if (!fs.existsSync(kitDir)) {
    if (options.verbose) console.log(`  ⏭️  Skipping ${kitName}: directory not found`);
    return null;
  }

  // Parse props from both platforms
  const tsxFile = path.join(kitDir, `_${kitName}.tsx`);
  const rbFile = path.join(kitDir, `${kitName}.rb`);

  const reactProps = parseTypeScriptProps(tsxFile);
  const railsProps = parseRubyProps(rbFile);
  const mergedProps = mergeProps(reactProps, railsProps);

  if (Object.keys(mergedProps).length === 0) {
    if (options.verbose) console.log(`  ⏭️  Skipping ${kitName}: no props found`);
    return null;
  }

  // Get metadata from menu.yml
  const menu = loadMenuYml();
  const menuData = findComponentInMenu(menu, kitName);

  // Determine available platforms
  const platforms = [];
  if (fs.existsSync(tsxFile)) platforms.push('react');
  if (fs.existsSync(rbFile)) platforms.push('rails');

  // Check for Swift support in menu.yml
  if (menuData?.platforms?.includes('swift')) {
    platforms.push('swift');
  }

  // Build the schema
  const componentName = snakeToPascal(kitName);
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
      const related = menuData.related_components;
      if (typeof related === 'string') {
        schema.relatedComponents = related
          .replace(/[\[\]]/g, '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
      }
    } catch {
      // Ignore parsing errors for related components
    }
  }

  return schema;
}

// =============================================================================
// KIT DISCOVERY
// =============================================================================

/**
 * Get all kit names from the pb_kits directory.
 */
function getAllKitNames() {
  const entries = fs.readdirSync(CONFIG.pbKitsDir);

  return entries
    .filter(entry => {
      // Must start with pb_ prefix
      if (!entry.startsWith('pb_')) return false;

      // Must be a directory
      const fullPath = path.join(CONFIG.pbKitsDir, entry);
      if (!fs.statSync(fullPath).isDirectory()) return false;

      return true;
    })
    .map(dir => dir.replace('pb_', ''))
    .filter(name => {
      // Exclude utility directories
      if (CONFIG.excludedDirs.includes(name)) return false;

      // Skip malformed names (e.g., pb_pb_something)
      if (name.startsWith('pb_')) return false;

      return true;
    })
    .sort();
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  const options = parseCliArgs();

  console.log('');
  console.log('🔧 Generating AI Metadata for Playbook Components');
  console.log('═'.repeat(50));
  console.log('');

  // Determine which kits to process
  const kitNames = options.kit ? [options.kit] : getAllKitNames();

  if (options.verbose) {
    console.log(`📦 Found ${kitNames.length} kits to process\n`);
  }

  // Track results
  let successCount = 0;
  let skipCount = 0;
  const errors = [];

  // Process each kit
  for (const kitName of kitNames) {
    try {
      const schema = generateKitSchema(kitName, { verbose: options.verbose });

      if (!schema) {
        skipCount++;
        continue;
      }

      // Determine output path
      const outputPath = options.outputDir
        ? path.join(options.outputDir, `${kitName}.schema.json`)
        : path.join(CONFIG.pbKitsDir, `pb_${kitName}`, 'kit.schema.json');

      if (options.dryRun) {
        console.log(`📝 [DRY RUN] Would write: ${outputPath}`);
        if (options.verbose) {
          const preview = JSON.stringify(schema, null, 2).slice(0, 400);
          console.log(preview + '...\n');
        }
      } else {
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write the schema file
        fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2) + '\n');
        console.log(`✅ ${kitName}`);
      }

      successCount++;
    } catch (error) {
      errors.push({ kit: kitName, error: error.message });
      if (options.verbose) {
        console.error(`❌ ${kitName}: ${error.message}`);
      }
    }
  }

  // Print summary
  console.log('');
  console.log('─'.repeat(50));
  console.log('📊 Summary');
  console.log('─'.repeat(50));
  console.log(`   ✅ Generated: ${successCount}`);
  console.log(`   ⏭️  Skipped:   ${skipCount}`);
  console.log(`   ❌ Errors:    ${errors.length}`);

  if (errors.length > 0 && options.verbose) {
    console.log('\n🔴 Errors:');
    for (const { kit, error } of errors) {
      console.log(`   • ${kit}: ${error}`);
    }
  }

  console.log('');
  console.log('✨ Done!');
  console.log('');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
