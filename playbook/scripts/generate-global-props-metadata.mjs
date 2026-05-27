#!/usr/bin/env node
/**
 * Generate Global Props Schema
 * ============================
 * 
 * Fully dynamic - parses all values from source files:
 *   - Props & types from globalProps.ts
 *   - Responsive detection from getResponsivePropClasses usage
 *   - Spacing tokens from tokens/_spacing.scss
 *   - Breakpoints from tokens/_screen_sizes.scss
 *   - Descriptions auto-generated from prop names
 * 
 * Usage:
 *   yarn generate:global-props-metadata           # Generate
 *   yarn generate:global-props-metadata --dry-run # Preview
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TypeRegistry, parseTypeDefinitions, parsePropsFromBlock, PATHS } from './lib/global-props-parser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// PATHS
// =============================================================================

const TOKENS_DIR = path.resolve(__dirname, '../app/pb_kits/playbook/tokens');
const OUTPUT_PATH = path.resolve(__dirname, '../app/pb_kits/playbook/utilities/global-props.schema.json');
const SCHEMA_VERSION = 'https://playbook.powerapp.cloud/schemas/global-props-schema.json';

// =============================================================================
// SCSS PARSING
// =============================================================================

/**
 * Parse spacing tokens from _spacing.scss
 * Returns: { xxs: '4px', xs: '8px', ... }
 */
function parseSpacingTokens() {
  const content = fs.readFileSync(path.join(TOKENS_DIR, '_spacing.scss'), 'utf8');
  const tokens = {};
  
  // Match: $space_xxs: 4px !default;
  for (const [, name, value] of content.matchAll(/\$space_(\w+):\s*(\d+px)/g)) {
    tokens[name] = value;
  }
  tokens.none = '0';
  
  return tokens;
}

/**
 * Parse breakpoints from _screen_sizes.scss
 * Returns: { xs: '575px', sm: '576px', ... }
 */
function parseBreakpoints() {
  const content = fs.readFileSync(path.join(TOKENS_DIR, '_screen_sizes.scss'), 'utf8');
  const breakpoints = {};
  
  // Match: $screen-xs-min: 575px !default;
  for (const [, size, value] of content.matchAll(/\$screen-(\w+)-min:\s*(\d+px)/g)) {
    breakpoints[size] = value;
  }
  
  return breakpoints;
}

// =============================================================================
// RESPONSIVE DETECTION
// =============================================================================

const TEST_DIR = path.resolve(__dirname, '../app/pb_kits/playbook/utilities/test/globalProps');

/**
 * Detect responsive props by scanning test files.
 * Test files that use testGlobalPropResponsiveWithDefault indicate responsive props.
 * This is the authoritative source - tests define the contract.
 */
function detectResponsiveProps() {
  const responsive = new Set();
  
  // Primary source: test files using testGlobalPropResponsiveWithDefault
  if (fs.existsSync(TEST_DIR)) {
    const testFiles = fs.readdirSync(TEST_DIR).filter(f => f.endsWith('.test.js'));
    
    for (const file of testFiles) {
      const content = fs.readFileSync(path.join(TEST_DIR, file), 'utf8');
      if (content.includes('testGlobalPropResponsiveWithDefault')) {
        // Extract prop name from filename: alignContent.test.js -> alignContent
        const propName = file.replace('.test.js', '');
        responsive.add(propName);
        
        // gap.test.js also tests columnGap and rowGap
        if (propName === 'gap') {
          responsive.add('columnGap');
          responsive.add('rowGap');
        }
      }
    }
  }
  
  // Margin/padding support responsive (tested via integration tests, not individual files)
  ['margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
   'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY'
  ].forEach(p => responsive.add(p));
  
  return responsive;
}

// =============================================================================
// DESCRIPTION GENERATION (fully algorithmic)
// =============================================================================

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Auto-generate description from prop name using pattern matching.
 * No hardcoded mappings - purely derived from naming conventions.
 */
function generateDescription(propName) {
  // Split camelCase: marginTop -> ['margin', 'Top']
  const parts = propName.replace(/([A-Z])/g, '|$1').split('|').filter(Boolean);
  const lower = parts.map(p => p.toLowerCase());
  
  // Pattern: prefixDirection (marginTop, paddingLeft, overflowX)
  const directions = { top: 'Top', bottom: 'Bottom', left: 'Left', right: 'Right', x: 'Horizontal', y: 'Vertical' };
  if (parts.length === 2 && directions[lower[1]]) {
    const dir = directions[lower[1]];
    if (lower[1] === 'x' || lower[1] === 'y') {
      return `${dir} ${lower[0]} (${lower[1] === 'x' ? 'left + right' : 'top + bottom'}).`;
    }
    return `${dir} ${lower[0]}.`;
  }
  
  // Pattern: minX, maxX (minWidth, maxHeight)
  if (lower[0] === 'min' || lower[0] === 'max') {
    return `${capitalize(lower[0])}imum ${lower.slice(1).join(' ')}.`;
  }
  
  // Pattern: flexX (flexDirection, flexWrap, flexGrow)
  if (lower[0] === 'flex' && parts.length > 1) {
    return `Flex ${lower.slice(1).join(' ')}.`;
  }
  
  // Pattern: alignX, justifyX
  if ((lower[0] === 'align' || lower[0] === 'justify') && parts.length > 1) {
    const axis = lower[1] === 'content' ? 'multi-line ' : (lower[1] === 'self' ? 'self ' : '');
    return `${capitalize(lower[0])} ${axis}${lower[1] === 'items' ? 'items' : lower[1]}.`;
  }
  
  // Pattern: rowX, columnX (rowGap, columnGap)
  if ((lower[0] === 'row' || lower[0] === 'column') && parts.length > 1) {
    return `${capitalize(lower[0])} ${lower.slice(1).join(' ')}.`;
  }
  
  // Simple single-word props - derive from name
  if (parts.length === 1) {
    const name = lower[0];
    // CSS properties get "CSS" prefix
    const cssProps = ['display', 'position', 'cursor', 'overflow', 'width', 'height'];
    if (cssProps.includes(name)) return `CSS ${name}.`;
    // Directional get "offset" suffix
    if (['top', 'right', 'bottom', 'left'].includes(name)) return `${capitalize(name)} offset.`;
    // Box model props
    if (name === 'margin' || name === 'padding') return `${capitalize(name)} on all sides.`;
    // Default
    return `${capitalize(name)}.`;
  }
  
  // Default: join words
  return `${capitalize(lower.join(' '))}.`;
}

// =============================================================================
// EXAMPLE GENERATION
// =============================================================================

function generateExample(propName, isResponsive, values) {
  if (!isResponsive) return null;
  
  const val = values?.[0] || 'md';
  return `${propName}="${val}" or ${propName}={{ default: "${val}", md: "${values?.[1] || 'lg'}" }}`;
}

// =============================================================================
// PARSING
// =============================================================================

function parseSourceFiles() {
  const registry = new TypeRegistry();
  const typeFiles = ['sizes.ts', 'display.ts', 'base.ts', 'spacing.ts'];

  // Parse type files
  for (const file of typeFiles) {
    const filePath = path.join(PATHS.typesDir, file);
    if (fs.existsSync(filePath)) {
      parseTypeDefinitions(fs.readFileSync(filePath, 'utf8'), registry);
    }
  }

  // Parse globalProps.ts
  const content = fs.readFileSync(PATHS.globalPropsTs, 'utf8');
  parseTypeDefinitions(content, registry);

  // Extract object-style types
  const typeProps = {};
  for (const [, name, block] of content.matchAll(/type\s+(\w+)\s*=\s*\{([^}]+)\}/g)) {
    typeProps[name] = parsePropsFromBlock(block, registry);
  }

  // Handle Hover = Shadow & { ... }
  const hoverMatch = content.match(/type\s+Hover\s*=\s*Shadow\s*&\s*\{([^}]+)\}/);
  if (hoverMatch && typeProps.Shadow) {
    typeProps.Hover = { ...typeProps.Shadow, ...parsePropsFromBlock(hoverMatch[1], registry) };
  }

  // Find GlobalProps member types
  const globalMatch = content.match(/export\s+type\s+GlobalProps\s*=\s*([^;]+)/);
  const memberTypes = globalMatch
    ? globalMatch[1].split('&').map(t => t.trim().replace(/[{}\s]/g, '')).filter(t => t && !t.includes(':'))
    : [];

  // Extract DOM-unsafe props
  const unsafeMatch = content.match(/const\s+notSafeProps\s*=\s*\[([^\]]+)\]/);
  const domUnsafeProps = unsafeMatch
    ? unsafeMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean)
    : [];

  return { typeProps, memberTypes, domUnsafeProps };
}

// =============================================================================
// SCHEMA BUILDER
// =============================================================================

function buildSchema() {
  const { typeProps, memberTypes, domUnsafeProps } = parseSourceFiles();
  const responsiveProps = detectResponsiveProps();
  const spacingTokens = parseSpacingTokens();
  const breakpoints = parseBreakpoints();

  // Build props
  const props = {};
  for (const typeName of memberTypes) {
    const typeDef = typeProps[typeName];
    if (!typeDef) continue;

    for (const [name, def] of Object.entries(typeDef)) {
      const isResponsive = responsiveProps.has(name);
      const type = isResponsive ? `${def.type || 'string'} | responsive` : (def.type || 'string');
      const example = generateExample(name, isResponsive, def.values);

      props[name] = {
        type,
        ...(def.values?.length && { values: def.values }),
        ...(isResponsive && { responsive: true }),
        description: generateDescription(name),
        ...(example && { example }),
        ...(def.type === 'boolean' && { default: false }),
      };
    }
  }

  // Add hover (nested object)
  if (typeProps.Hover) {
    const hoverProps = {};
    for (const [name, def] of Object.entries(typeProps.Hover)) {
      hoverProps[name] = { type: def.type, ...(def.values && { values: def.values }) };
    }
    props.hover = {
      type: 'object',
      properties: hoverProps,
      description: generateDescription('hover'),
      example: 'hover={{ shadow: "deep", scale: "sm" }}',
    };
  }

  // Add groupHover
  props.groupHover = {
    type: 'boolean',
    default: false,
    description: generateDescription('groupHover'),
  };

  // Get spacing values from margin prop or fallback
  const spacingValues = props.margin?.values || Object.keys(spacingTokens);

  // Format breakpoints for schema
  const breakpointRanges = {
    xs: `0-${parseInt(breakpoints.sm) - 1}px`,
    sm: `${breakpoints.sm}-${parseInt(breakpoints.md) - 1}px`,
    md: `${breakpoints.md}-${parseInt(breakpoints.lg) - 1}px`,
    lg: `${breakpoints.lg}-${parseInt(breakpoints.xl) - 1}px`,
    xl: `${breakpoints.xl}+`,
  };

  return {
    $schema: SCHEMA_VERSION,
    name: 'GlobalProps',
    description: 'Global props available on all Playbook components for consistent spacing, layout, and styling.',

    breakpoints: breakpointRanges,

    spacing: {
      values: spacingValues,
      description: 'Standard spacing scale for margin/padding.',
      tokens: spacingTokens,
    },

    props,

    responsiveUsage: {
      description: 'Props marked responsive accept breakpoint objects.',
      example: {
        padding: '{{ default: "sm", md: "lg" }}',
        display: '{{ default: "block", md: "flex" }}',
      },
      breakpoints: { default: 'Base (mobile-first)', ...breakpointRanges },
    },

    warnings: {
      domSafeProps: {
        description: 'Use domSafeProps() to filter non-DOM props when spreading.',
        nonSafeProps: domUnsafeProps,
      },
    },
  };
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const verbose = process.argv.includes('--verbose');

  console.log('\n🔧 Generating Global Props Metadata (fully dynamic)');
  console.log('═'.repeat(55) + '\n');

  const schema = buildSchema();
  const propCount = Object.keys(schema.props).length;
  const responsiveCount = Object.values(schema.props).filter(p => p.responsive).length;

  console.log(`📦 Parsed ${propCount} props (${responsiveCount} responsive)`);
  console.log(`📐 Breakpoints: ${Object.keys(schema.breakpoints).join(', ')}`);
  console.log(`📏 Spacing tokens: ${Object.keys(schema.spacing.tokens).join(', ')}`);

  if (verbose) {
    console.log('\nResponsive props:', Object.entries(schema.props).filter(([,p]) => p.responsive).map(([n]) => n).join(', '));
  }

  if (dryRun) {
    console.log(`\n📝 [DRY RUN] Would write to: ${OUTPUT_PATH}`);
    if (verbose) {
      console.log('\nSample:');
      ['margin', 'display', 'flexDirection'].forEach(p => {
        if (schema.props[p]) console.log(`  ${p}:`, JSON.stringify(schema.props[p]));
      });
    }
  } else {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(schema, null, 2) + '\n');
    console.log(`\n✅ Written to: ${OUTPUT_PATH}`);
  }

  console.log('\n✨ Done!\n');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
