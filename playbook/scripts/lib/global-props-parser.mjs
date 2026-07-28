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
 * Split a type expression on a top-level operator, respecting nested braces/parens.
 * e.g., splitTopLevel("A | B | { x: number }", '|') -> ["A", "B", "{ x: number }"]
 *       splitTopLevel('A & ("a" | "b")', '&') -> ["A", '("a" | "b")']
 */
function splitTopLevel(str, operator) {
  const parts = [];
  let current = '';
  let depth = 0;

  for (const char of str) {
    if ('{(<'.includes(char)) depth++;
    if ('})>'.includes(char)) depth--;

    if (char === operator && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current.trim()) parts.push(current.trim());
  return parts;
}

const splitUnionType = (str) => splitTopLevel(str, '|');

/**
 * Remove parens that wrap an entire expression, e.g. '("a" | "b")' -> '"a" | "b"'.
 * Parens that only wrap part of the expression are left alone.
 */
function stripOuterParens(str) {
  let expr = str.trim();

  while (expr.startsWith('(') && expr.endsWith(')')) {
    let depth = 0;
    let wrapsWholeExpr = true;

    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === '(') depth++;
      else if (expr[i] === ')' && --depth === 0 && i < expr.length - 1) {
        wrapsWholeExpr = false;
        break;
      }
    }

    if (!wrapsWholeExpr) break;
    expr = expr.slice(1, -1).trim();
  }

  return expr;
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
    typeExpr = stripOuterParens(typeExpr);
    if (!typeExpr) return null;
    
    // Circular reference guard
    if (visited.has(typeExpr)) return null;
    visited.add(typeExpr);
    
    // Check if we have this type registered
    if (this.types.has(typeExpr)) {
      const def = this.types.get(typeExpr);
      return typeof def === 'string' ? this.resolve(def, visited) : def;
    }
    
    // Indexed access on a const array: typeof BitValues[number]
    const indexedAccess = typeExpr.match(/^typeof\s+(\w+)\s*\[\s*number\s*\]$/);
    if (indexedAccess) {
      return this.resolve(indexedAccess[1], visited);
    }
    
    // Union type: A | B | C (checked first so `A & ("a" | "b")` reads as an intersection)
    if (splitTopLevel(typeExpr, '|').length > 1) {
      return this.#resolveUnion(typeExpr, visited);
    }
    
    // Intersection type: A & B (combine values from both)
    if (splitTopLevel(typeExpr, '&').length > 1) {
      return this.#resolveIntersection(typeExpr, visited);
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
    const parts = splitTopLevel(intersectionExpr, '&');
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
  // Generic declarations (`type Callback<T, K> = ...`) act as boundaries but are not captured,
  // otherwise the preceding alias swallows them and resolves to nonsense.
  const TYPE_DECL = String.raw`(?:export\s+)?type\s+\w+\s*(?:<[^>]*>)?\s*=`;
  const CONST_DECL = String.raw`(?:export\s+)?const\s+\w+\s*=`;
  const typeRegex = new RegExp(
    String.raw`(?:export\s+)?type\s+(\w+)\s*=\s*((?:(?!\n\s*${TYPE_DECL}).)+?)(?=\n\s*${TYPE_DECL}|\n\s*${CONST_DECL}|$)`,
    'gs'
  );
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
 * Extract object-style type definitions (`type Foo = { bar?: Type }`) into `target`,
 * keyed by type name. Definitions spread across files are merged.
 *
 * The registry must already hold every alias these blocks reference, so run
 * parseTypeDefinitions over all sources first.
 */
export function parseObjectTypes(content, registry, target = {}) {
  for (const [, name, block] of content.matchAll(/type\s+(\w+)\s*=\s*\{([^}]+)\}/g)) {
    target[name] = { ...target[name], ...parsePropsFromBlock(block, registry) };
  }

  return target;
}

/** Read the type files that globalProps.ts imports from. */
export function readTypeFiles() {
  return TYPE_FILES
    .map(file => path.join(PATHS.typesDir, file))
    .filter(filePath => fs.existsSync(filePath))
    .map(filePath => fs.readFileSync(filePath, 'utf8'));
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
  const content = fs.readFileSync(PATHS.globalPropsTs, 'utf8');
  
  // 1. Register aliases from the imported type files (sizes, display, etc.) and globalProps.ts
  const sources = [...readTypeFiles(), content];
  for (const source of sources) {
    parseTypeDefinitions(source, registry);
  }
  
  // 2. Extract object-style type definitions from every source, since types used by
  //    GlobalProps (e.g. Display) may be declared in a type file rather than inline
  const typeProps = {};
  for (const source of sources) {
    parseObjectTypes(source, registry, typeProps);
  }
  
  // 3. Handle Hover = Shadow & { ... } inheritance
  const hoverMatch = content.match(/type\s+Hover\s*=\s*Shadow\s*&\s*\{([^}]+)\}/);
  if (hoverMatch && typeProps['Shadow']) {
    typeProps['Hover'] = {
      ...typeProps['Shadow'],
      ...parsePropsFromBlock(hoverMatch[1], registry),
    };
  }
  
  // 4. Find which types make up GlobalProps
  const globalPropsMatch = content.match(/export\s+type\s+GlobalProps\s*=\s*([^;]+)/);
  const memberTypes = globalPropsMatch
    ? globalPropsMatch[1]
        .split('&')
        .map(t => t.trim().replace(/[{}\s]/g, ''))
        .filter(t => t && !t.includes(':'))
    : [];
  
  // 5. Collect all prop names and definitions
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
  
  // 6. Always include hover props
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
