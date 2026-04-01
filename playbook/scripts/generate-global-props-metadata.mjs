#!/usr/bin/env node
/**
 * Generate AI-Friendly Metadata for Playbook Global Props
 * ========================================================
 * 
 * This script generates global-props.schema.json by parsing the actual
 * TypeScript type definitions from globalProps.ts and its imports.
 * 
 * No manual value lists - everything is parsed from source!
 * 
 * Usage:
 *   yarn generate:global-props-metadata           # Generate schema
 *   yarn generate:global-props-metadata --dry-run # Preview without writing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// =============================================================================
// CONFIGURATION
// =============================================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  globalPropsPath: path.resolve(__dirname, '../app/pb_kits/playbook/utilities/globalProps.ts'),
  typesDir: path.resolve(__dirname, '../app/pb_kits/playbook/types'),
  outputPath: path.resolve(__dirname, '../app/pb_kits/playbook/utilities/global-props.schema.json'),
  schemaVersion: 'https://playbook.powerapp.cloud/schemas/global-props-schema.json',
};

// =============================================================================
// PROP METADATA (descriptions, responsive flags, examples)
// =============================================================================

const PROP_METADATA = {
  // Spacing
  margin: { description: 'Margin on all sides.', responsive: true, example: 'margin="md" or margin={{ default: "sm", md: "lg" }}' },
  marginTop: { description: 'Top margin.', responsive: true },
  marginBottom: { description: 'Bottom margin.', responsive: true },
  marginLeft: { description: 'Left margin.', responsive: true },
  marginRight: { description: 'Right margin.', responsive: true },
  marginX: { description: 'Horizontal margin (left and right).', responsive: true },
  marginY: { description: 'Vertical margin (top and bottom).', responsive: true },
  padding: { description: 'Padding on all sides.', responsive: true, example: 'padding="md" or padding={{ default: "sm", md: "lg" }}' },
  paddingTop: { description: 'Top padding.', responsive: true },
  paddingBottom: { description: 'Bottom padding.', responsive: true },
  paddingLeft: { description: 'Left padding.', responsive: true },
  paddingRight: { description: 'Right padding.', responsive: true },
  paddingX: { description: 'Horizontal padding (left and right).', responsive: true },
  paddingY: { description: 'Vertical padding (top and bottom).', responsive: true },
  
  // Display & Layout
  display: { description: 'CSS display property.', responsive: true, example: 'display="flex" or display={{ default: "block", md: "flex" }}' },
  position: { description: 'CSS position property.' },
  top: { description: 'Top positioning. Can use object: { value: "sm", inset: true }.' },
  right: { description: 'Right positioning. Can use object: { value: "sm", inset: true }.' },
  bottom: { description: 'Bottom positioning. Can use object: { value: "sm", inset: true }.' },
  left: { description: 'Left positioning. Can use object: { value: "sm", inset: true }.' },
  zIndex: { description: 'Z-index stacking order.', responsive: true },
  
  // Sizing
  width: { description: 'CSS width. Supports values like "100%", "50px", "auto".' },
  minWidth: { description: 'CSS min-width.' },
  maxWidth: { description: 'CSS max-width.' },
  height: { description: 'Height. Predefined values or custom CSS value.' },
  minHeight: { description: 'Minimum height.' },
  maxHeight: { description: 'Maximum height.' },
  
  // Flexbox
  flex: { description: 'Flex shorthand property.', responsive: true },
  flexDirection: { description: 'Flex direction.', responsive: true },
  flexWrap: { description: 'Flex wrap behavior.', responsive: true },
  flexGrow: { description: 'Flex grow factor.', responsive: true },
  flexShrink: { description: 'Flex shrink factor.', responsive: true },
  justifyContent: { description: 'Justify content (main axis alignment).', responsive: true },
  justifySelf: { description: 'Justify self alignment.', responsive: true },
  alignItems: { description: 'Align items (cross axis alignment).', responsive: true },
  alignContent: { description: 'Align content for multi-line flex containers.', responsive: true },
  alignSelf: { description: 'Align self override.', responsive: true },
  order: { description: 'Flex order.', responsive: true },
  gap: { description: 'Gap between flex/grid items.', responsive: true },
  rowGap: { description: 'Gap between rows.', responsive: true },
  columnGap: { description: 'Gap between columns.', responsive: true },
  
  // Visual
  borderRadius: { description: 'Border radius.' },
  shadow: { description: 'Box shadow depth.' },
  cursor: { description: 'CSS cursor type.' },
  overflow: { description: 'CSS overflow property.' },
  overflowX: { description: 'CSS overflow-x property.' },
  overflowY: { description: 'CSS overflow-y property.' },
  
  // Typography
  textAlign: { description: 'Text alignment.', responsive: true },
  verticalAlign: { description: 'Vertical alignment.', responsive: true },
  lineHeight: { description: 'Line height.' },
  truncate: { description: 'Truncates text with ellipsis after specified number of lines.' },
  numberSpacing: { description: 'Number spacing for tabular alignment.' },
  
  // Theme
  dark: { description: 'Applies dark mode styling.' },
  
  // Interactivity
  hover: { description: 'Hover state effects.', example: 'hover={{ shadow: "deep", scale: "sm" }}' },
  groupHover: { description: 'Enables group hover styling.' },
};

// =============================================================================
// TYPE REGISTRY (collects all type definitions)
// =============================================================================

class TypeRegistry {
  constructor() {
    this.types = new Map();
  }

  /**
   * Register a type definition.
   */
  register(name, definition) {
    this.types.set(name, definition);
  }

  /**
   * Resolve a type reference to its actual values.
   * @param {string} typeExpr - The type expression to resolve
   * @param {Set} visited - Set of already visited types (prevents infinite loops)
   */
  resolve(typeExpr, visited = new Set()) {
    if (!typeExpr) return null;
    
    typeExpr = typeExpr.trim();
    
    // Prevent infinite loops
    if (visited.has(typeExpr)) return null;
    visited.add(typeExpr);
    
    // Already have this type registered?
    if (this.types.has(typeExpr)) {
      const def = this.types.get(typeExpr);
      // If it's another reference, resolve recursively
      if (typeof def === 'string') {
        return this.resolve(def, visited);
      }
      return def;
    }
    
    // Handle union types: A | B | C
    if (typeExpr.includes('|')) {
      return this.resolveUnion(typeExpr, visited);
    }
    
    // Handle simple literals
    if (typeExpr.startsWith('"') || typeExpr.startsWith("'")) {
      return { type: 'enum', values: [typeExpr.slice(1, -1)] };
    }
    
    if (/^\d+$/.test(typeExpr)) {
      return { type: 'enum', values: [parseInt(typeExpr, 10)] };
    }
    
    // Primitive types
    if (typeExpr === 'boolean') return { type: 'boolean' };
    if (typeExpr === 'string') return { type: 'string' };
    if (typeExpr === 'number') return { type: 'number' };
    
    return null;
  }

  /**
   * Resolve a union type like: "a" | "b" | SomeType | number
   */
  resolveUnion(unionExpr, visited = new Set()) {
    const parts = this.splitUnion(unionExpr);
    const values = [];
    let hasObject = false;
    let hasString = false;
    
    for (const part of parts) {
      const trimmed = part.trim();
      
      // Skip empty parts
      if (!trimmed) continue;
      
      // String literal
      if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
          (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        values.push(trimmed.slice(1, -1));
        continue;
      }
      
      // Number literal
      if (/^\d+$/.test(trimmed)) {
        values.push(parseInt(trimmed, 10));
        continue;
      }
      
      // 'max' as a special value
      if (trimmed === "'max'" || trimmed === '"max"') {
        values.push('max');
        continue;
      }
      
      // Object type
      if (trimmed.startsWith('{')) {
        hasObject = true;
        continue;
      }
      
      // String type
      if (trimmed === 'string') {
        hasString = true;
        continue;
      }
      
      // Type reference - resolve it (with visited set)
      const resolved = this.resolve(trimmed, new Set(visited));
      if (resolved?.values) {
        values.push(...resolved.values);
      } else if (resolved?.type === 'string') {
        hasString = true;
      }
    }
    
    // Deduplicate
    const uniqueValues = [...new Set(values)];
    
    if (uniqueValues.length === 0) {
      if (hasString) return { type: 'string' };
      if (hasObject) return { type: 'object' };
      return null;
    }
    
    let type = 'enum';
    if (hasObject) type = 'enum | object';
    if (hasString) type = 'string | enum';
    
    return { type, values: uniqueValues };
  }

  /**
   * Split a union type string by | while respecting braces and parens.
   */
  splitUnion(str) {
    const parts = [];
    let current = '';
    let depth = 0;
    
    for (const char of str) {
      if (char === '{' || char === '(' || char === '<') depth++;
      else if (char === '}' || char === ')' || char === '>') depth--;
      
      if (char === '|' && depth === 0) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    if (current.trim()) {
      parts.push(current.trim());
    }
    
    return parts;
  }
}

// =============================================================================
// TYPESCRIPT PARSER
// =============================================================================

/**
 * Parse all imported types from the types directory.
 */
function parseImportedTypes(registry) {
  const typeFiles = ['sizes.ts', 'display.ts', 'base.ts', 'spacing.ts'];
  
  for (const file of typeFiles) {
    const filePath = path.join(CONFIG.typesDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    const content = fs.readFileSync(filePath, 'utf8');
    parseTypeDefinitions(content, registry);
  }
}

/**
 * Parse type definitions from a TypeScript content string.
 */
function parseTypeDefinitions(content, registry) {
  // Match: export type TypeName = "value1" | "value2" | ...
  const typePattern = /(?:export\s+)?type\s+(\w+)\s*=\s*([^;{]+?)(?:;|\n|$)/g;
  let match;
  
  while ((match = typePattern.exec(content)) !== null) {
    const [, typeName, typeExpr] = match;
    registry.register(typeName, typeExpr.trim());
  }
  
  // Match: export const SomeValues = [0, 1] as const  ->  type Binary = typeof SomeValues[number]
  const constArrayPattern = /export\s+const\s+(\w+)\s*=\s*\[([^\]]+)\]\s*as\s+const/g;
  while ((match = constArrayPattern.exec(content)) !== null) {
    const [, constName, values] = match;
    const parsedValues = values.split(',').map(v => {
      v = v.trim();
      if (v.startsWith('"') || v.startsWith("'")) return v.slice(1, -1);
      if (/^\d+$/.test(v)) return parseInt(v, 10);
      return v;
    });
    // Register the values array name as an enum
    registry.register(constName, { type: 'enum', values: parsedValues });
  }
}

/**
 * Parse the main globalProps.ts file.
 */
function parseGlobalPropsFile(registry) {
  const content = fs.readFileSync(CONFIG.globalPropsPath, 'utf8');
  
  // First parse inline type definitions
  parseTypeDefinitions(content, registry);
  
  // Parse object-style type definitions
  // Match: type TypeName = { prop?: type, ... }
  const objectTypePattern = /type\s+(\w+)\s*=\s*\{([^}]+)\}/g;
  let match;
  const typeProps = {};
  
  while ((match = objectTypePattern.exec(content)) !== null) {
    const [, typeName, propsBlock] = match;
    typeProps[typeName] = parsePropsFromBlock(propsBlock, registry);
  }
  
  // Parse Hover type (has & inheritance)
  const hoverMatch = content.match(/type\s+Hover\s*=\s*Shadow\s*&\s*\{([^}]+)\}/);
  if (hoverMatch && typeProps['Shadow']) {
    typeProps['Hover'] = {
      ...typeProps['Shadow'],
      ...parsePropsFromBlock(hoverMatch[1], registry),
    };
  }
  
  // Extract GlobalProps type members
  const globalPropsMatch = content.match(/export\s+type\s+GlobalProps\s*=\s*([^;]+)/);
  const globalPropTypes = globalPropsMatch
    ? globalPropsMatch[1].split('&').map(t => t.trim().replace(/[{}\s]/g, '')).filter(t => t && !t.includes(':'))
    : [];
  
  // Extract DOM-unsafe props
  const domUnsafeProps = extractDomUnsafeProps(content);
  
  return { typeProps, globalPropTypes, domUnsafeProps };
}

/**
 * Parse props from a type block like { prop?: Type, ... }
 */
function parsePropsFromBlock(block, registry) {
  const props = {};
  
  // Match: propName?: TypeExpr,
  const propPattern = /(\w+)\??:\s*([^,\n]+)/g;
  let match;
  
  while ((match = propPattern.exec(block)) !== null) {
    const [, propName, typeExpr] = match;
    
    // Skip internal props
    if (propName === 'break' || propName === 'default') continue;
    
    const resolved = registry.resolve(typeExpr.trim());
    if (resolved) {
      props[propName] = resolved;
    }
  }
  
  return props;
}

/**
 * Extract DOM-unsafe props from the domSafeProps function.
 */
function extractDomUnsafeProps(content) {
  const match = content.match(/const\s+notSafeProps\s*=\s*\[([^\]]+)\]/);
  if (!match) return [];
  
  return match[1]
    .split(',')
    .map(s => s.trim().replace(/['"]/g, ''))
    .filter(s => s.length > 0);
}

// =============================================================================
// SCHEMA BUILDER
// =============================================================================

function buildSchema() {
  const registry = new TypeRegistry();
  
  // Parse imported types first
  parseImportedTypes(registry);
  
  // Then parse globalProps.ts
  const { typeProps, globalPropTypes, domUnsafeProps } = parseGlobalPropsFile(registry);
  
  // Build props object
  const props = {};
  
  for (const typeName of globalPropTypes) {
    const typeDefinition = typeProps[typeName];
    if (!typeDefinition) continue;
    
    for (const [propName, propDef] of Object.entries(typeDefinition)) {
      const metadata = PROP_METADATA[propName] || {};
      
      let type = propDef.type || 'string';
      if (metadata.responsive) {
        type = type.includes('|') ? `${type} | responsive` : `${type} | responsive`;
      }
      
      props[propName] = {
        type,
        ...(propDef.values?.length > 0 && { values: propDef.values }),
        ...(metadata.responsive && { responsive: true }),
        description: metadata.description || `${propName} property.`,
        ...(metadata.example && { example: metadata.example }),
        ...(propDef.type === 'boolean' && { default: false }),
      };
    }
  }
  
  // Add hover prop with nested structure
  if (typeProps['Hover']) {
    const hoverProps = {};
    for (const [name, def] of Object.entries(typeProps['Hover'])) {
      hoverProps[name] = {
        type: def.type,
        ...(def.values && { values: def.values }),
      };
    }
    
    props['hover'] = {
      type: 'object',
      properties: hoverProps,
      description: PROP_METADATA.hover?.description || 'Hover state effects.',
      ...(PROP_METADATA.hover?.example && { example: PROP_METADATA.hover.example }),
    };
  }
  
  // Add groupHover
  props['groupHover'] = {
    type: 'boolean',
    default: false,
    description: PROP_METADATA.groupHover?.description || 'Enables group hover styling.',
  };
  
  // Extract spacing values (from margin prop)
  const spacingValues = props['margin']?.values || 
    ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'auto', 'initial', 'inherit'];
  
  return {
    $schema: CONFIG.schemaVersion,
    name: 'GlobalProps',
    description: 'Global props available on all Playbook components. These props provide consistent spacing, layout, display, and styling across the design system.',
    
    breakpoints: {
      xs: '0-575px',
      sm: '576-767px',
      md: '768-991px',
      lg: '992-1199px',
      xl: '1200px+',
    },
    
    spacing: {
      values: spacingValues,
      description: 'Standard spacing scale used for margin and padding props.',
      tokens: {
        none: '0',
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
    
    props,
    
    responsiveUsage: {
      description: 'Many global props support responsive values using an object with breakpoint keys.',
      example: {
        padding: '{{ default: "sm", xs: "xs", md: "md", lg: "lg" }}',
        display: '{{ default: "block", md: "flex" }}',
        textAlign: '{{ default: "center", lg: "left" }}',
      },
      breakpoints: {
        default: 'Base value (mobile-first)',
        xs: '0-575px',
        sm: '576-767px',
        md: '768-991px',
        lg: '992-1199px',
        xl: '1200px+',
      },
    },
    
    warnings: {
      domSafeProps: {
        description: 'When spreading props onto DOM elements in custom components, use domSafeProps() to remove non-DOM props.',
        nonSafeProps: domUnsafeProps,
      },
    },
  };
}

// =============================================================================
// CLI & MAIN
// =============================================================================

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const verbose = process.argv.includes('--verbose');

  console.log('');
  console.log('🔧 Generating Global Props Metadata (from TypeScript source)');
  console.log('═'.repeat(60));
  console.log('');

  const schema = buildSchema();
  const propCount = Object.keys(schema.props).length;

  console.log(`📦 Parsed ${propCount} props from globalProps.ts + types/`);

  if (verbose) {
    console.log('\nProps found:', Object.keys(schema.props).sort().join(', '));
    console.log('\nSpacing values:', schema.spacing.values.join(', '));
  }

  if (dryRun) {
    console.log('\n📝 [DRY RUN] Would write to:', CONFIG.outputPath);
    if (verbose) {
      console.log('\nSample props:');
      const sampleProps = ['margin', 'display', 'flexDirection', 'borderRadius'];
      for (const p of sampleProps) {
        if (schema.props[p]) {
          console.log(`  ${p}:`, JSON.stringify(schema.props[p]));
        }
      }
    }
  } else {
    const outputDir = path.dirname(CONFIG.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(CONFIG.outputPath, JSON.stringify(schema, null, 2) + '\n');
    console.log(`✅ Written to: ${CONFIG.outputPath}`);
  }

  console.log('');
  console.log('✨ Done!');
  console.log('');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
