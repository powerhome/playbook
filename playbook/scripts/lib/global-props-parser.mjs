/**
 * Global Props Parser
 * ====================
 * 
 * Parses TypeScript type definitions from globalProps.ts to extract prop names and types.
 * Single source of truth for global props - used by both:
 *   - generate-ai-metadata.mjs (to filter out global props from kit schemas)
 *   - generate-global-props-metadata.mjs (to build the full global props schema)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// CONFIGURATION
// =============================================================================

export const PATHS = {
  globalPropsTs: path.resolve(__dirname, '../../app/pb_kits/playbook/utilities/globalProps.ts'),
  typesDir: path.resolve(__dirname, '../../app/pb_kits/playbook/types'),
};

const TYPE_FILES = ['sizes.ts', 'display.ts', 'base.ts', 'spacing.ts'];
const RESERVED_PROPS = new Set(['break', 'default']);

// =============================================================================
// HELPERS
// =============================================================================

const isStringLiteral = (s) => (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"));
const isNumericLiteral = (s) => /^\d+$/.test(s);
const stripQuotes = (s) => s.slice(1, -1);
const dedupe = (arr) => [...new Set(arr)];

/**
 * Split a union type by | while respecting nested braces/parens.
 * e.g., "A | B | { x: number }" -> ["A", "B", "{ x: number }"]
 */
function splitUnionType(str) {
  const parts = [];
  let current = '';
  let depth = 0;
  
  for (const char of str) {
    if ('{(<'.includes(char)) depth++;
    if ('})>'.includes(char)) depth--;
    
    if (char === '|' && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/**
 * Parse a literal value (string, number) into its JS representation.
 */
function parseLiteral(value) {
  if (isStringLiteral(value)) return stripQuotes(value);
  if (isNumericLiteral(value)) return parseInt(value, 10);
  return value;
}

// =============================================================================
// TYPE REGISTRY
// =============================================================================

/**
 * Collects and resolves TypeScript type definitions.
 * Handles type aliases, union types, and literal types.
 */
export class TypeRegistry {
  constructor() {
    this.types = new Map();
  }

  /** Register a type definition (either a string alias or resolved object) */
  register(name, definition) {
    this.types.set(name, definition);
  }

  /**
   * Resolve a type expression to its concrete values.
   * @param {string} typeExpr - Type expression like '"a" | "b"' or 'SomeType'
   * @param {Set} visited - Tracks visited types to prevent circular refs
   * @returns {{ type: string, values?: any[] } | null}
   */
  resolve(typeExpr, visited = new Set()) {
    if (!typeExpr) return null;
    typeExpr = typeExpr.trim();
    
    // Circular reference guard
    if (visited.has(typeExpr)) return null;
    visited.add(typeExpr);
    
    // Check if we have this type registered
    if (this.types.has(typeExpr)) {
      const def = this.types.get(typeExpr);
      return typeof def === 'string' ? this.resolve(def, visited) : def;
    }
    
    // Intersection type: A & B (combine values from both)
    if (typeExpr.includes('&') && !typeExpr.includes('|')) {
      return this.#resolveIntersection(typeExpr, visited);
    }
    
    // Union type: A | B | C
    if (typeExpr.includes('|')) {
      return this.#resolveUnion(typeExpr, visited);
    }
    
    // Literal types
    if (isStringLiteral(typeExpr)) {
      return { type: 'enum', values: [stripQuotes(typeExpr)] };
    }
    if (isNumericLiteral(typeExpr)) {
      return { type: 'enum', values: [parseInt(typeExpr, 10)] };
    }
    
    // Primitive types
    const primitives = { boolean: 'boolean', string: 'string', number: 'number' };
    if (primitives[typeExpr]) return { type: primitives[typeExpr] };
    
    return null;
  }

  /** Resolve an intersection type like Alignment & Space (combine values) */
  #resolveIntersection(intersectionExpr, visited) {
    const parts = intersectionExpr.split('&').map(p => p.trim()).filter(Boolean);
    const allValues = [];
    
    for (const part of parts) {
      const resolved = this.resolve(part, new Set(visited));
      if (resolved?.values) {
        allValues.push(...resolved.values);
      }
    }
    
    if (allValues.length === 0) return null;
    return { type: 'enum', values: dedupe(allValues) };
  }

  /** Resolve a union type like "a" | "b" | SomeType */
  #resolveUnion(unionExpr, visited) {
    const parts = splitUnionType(unionExpr);
    const values = [];
    let flags = { hasObject: false, hasString: false };
    
    for (const part of parts) {
      // String/number literals
      if (isStringLiteral(part)) {
        values.push(stripQuotes(part));
        continue;
      }
      if (isNumericLiteral(part)) {
        values.push(parseInt(part, 10));
        continue;
      }
      
      // Object type marker
      if (part.startsWith('{')) {
        flags.hasObject = true;
        continue;
      }
      
      // String type marker
      if (part === 'string') {
        flags.hasString = true;
        continue;
      }
      
      // Type reference - resolve recursively
      const resolved = this.resolve(part, new Set(visited));
      if (resolved?.values) {
        values.push(...resolved.values);
      } else if (resolved?.type === 'string') {
        flags.hasString = true;
      }
    }
    
    const uniqueValues = dedupe(values);
    
    // Determine the result type
    if (uniqueValues.length === 0) {
      if (flags.hasString) return { type: 'string' };
      if (flags.hasObject) return { type: 'object' };
      return null;
    }
    
    let type = 'enum';
    if (flags.hasObject) type = 'enum | object';
    if (flags.hasString) type = 'string | enum';
    
    return { type, values: uniqueValues };
  }
}

// =============================================================================
// TYPESCRIPT PARSING
// =============================================================================

/**
 * Parse type definitions from TypeScript content.
 * Handles: `type Foo = "a" | "b"` and `const X = [...] as const`
 */
export function parseTypeDefinitions(content, registry) {
  // Type aliases: type Foo = "a" | "b" | ...
  // Keep this separate from object-style type parsing so multiline unions resolve to every approved value.
  const typeRegex = /(?:export\s+)?type\s+(\w+)\s*=\s*((?:(?!\n\s*(?:export\s+)?type\s+\w+\s*=).)+?)(?=\n\s*(?:export\s+)?type\s+\w+\s*=|\n\s*(?:export\s+)?const\s+\w+\s*=|$)/gs;
  for (const [, name, expr] of content.matchAll(typeRegex)) {
    const normalized = expr.trim().replace(/;\s*$/, '');
    if (!normalized.startsWith('{') && !normalized.includes('{')) {
      registry.register(name, normalized);
    }
  }
  
  // Const arrays: const Sizes = ["sm", "md"] as const
  const constRegex = /export\s+const\s+(\w+)\s*=\s*\[([^\]]+)\]\s*as\s+const/g;
  for (const [, name, valuesStr] of content.matchAll(constRegex)) {
    const values = valuesStr.split(',').map(v => parseLiteral(v.trim()));
    registry.register(name, { type: 'enum', values });
  }
}

/**
 * Parse props from a type block like `{ prop?: Type, ... }`
 */
export function parsePropsFromBlock(block, registry) {
  const props = {};
  const propRegex = /(\w+)\??:\s*([^,\n]+)/g;
  
  for (const [, name, typeExpr] of block.matchAll(propRegex)) {
    if (RESERVED_PROPS.has(name)) continue;
    
    const resolved = registry.resolve(typeExpr.trim());
    if (resolved) props[name] = resolved;
  }
  
  return props;
}

// =============================================================================
// MAIN API
// =============================================================================

/**
 * Parse all global props from TypeScript source files.
 * 
 * @returns {{
 *   globalPropNames: Set<string>,
 *   globalPropDefs: Object,
 *   hoverProps: Object
 * }}
 */
export function parseGlobalProps() {
  const registry = new TypeRegistry();
  
  // 1. Parse imported type files (sizes, display, etc.)
  for (const file of TYPE_FILES) {
    const filePath = path.join(PATHS.typesDir, file);
    if (fs.existsSync(filePath)) {
      parseTypeDefinitions(fs.readFileSync(filePath, 'utf8'), registry);
    }
  }
  
  // 2. Parse globalProps.ts
  const content = fs.readFileSync(PATHS.globalPropsTs, 'utf8');
  parseTypeDefinitions(content, registry);
  
  // 3. Extract object-style type definitions: type Foo = { bar?: Type }
  const typeProps = {};
  const objectTypeRegex = /type\s+(\w+)\s*=\s*\{([^}]+)\}/g;
  for (const [, name, block] of content.matchAll(objectTypeRegex)) {
    typeProps[name] = parsePropsFromBlock(block, registry);
  }
  
  // 4. Handle Hover = Shadow & { ... } inheritance
  const hoverMatch = content.match(/type\s+Hover\s*=\s*Shadow\s*&\s*\{([^}]+)\}/);
  if (hoverMatch && typeProps['Shadow']) {
    typeProps['Hover'] = {
      ...typeProps['Shadow'],
      ...parsePropsFromBlock(hoverMatch[1], registry),
    };
  }
  
  // 5. Find which types make up GlobalProps
  const globalPropsMatch = content.match(/export\s+type\s+GlobalProps\s*=\s*([^;]+)/);
  const memberTypes = globalPropsMatch
    ? globalPropsMatch[1]
        .split('&')
        .map(t => t.trim().replace(/[{}\s]/g, ''))
        .filter(t => t && !t.includes(':'))
    : [];
  
  // 6. Collect all prop names and definitions
  const globalPropNames = new Set();
  const globalPropDefs = {};
  
  for (const typeName of memberTypes) {
    const props = typeProps[typeName];
    if (!props) continue;
    
    for (const [name, def] of Object.entries(props)) {
      globalPropNames.add(name);
      globalPropDefs[name] = def;
    }
  }
  
  // 7. Always include hover props
  globalPropNames.add('hover');
  globalPropNames.add('groupHover');
  
  return {
    globalPropNames,
    globalPropDefs,
    hoverProps: typeProps['Hover'] || {},
  };
}

/**
 * Get just the prop names (convenience wrapper for kit generation).
 */
export function getGlobalPropNames() {
  return parseGlobalProps().globalPropNames;
}
