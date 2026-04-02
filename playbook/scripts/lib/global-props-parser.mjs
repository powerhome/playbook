/**
 * Global Props Parser
 * ====================
 * 
 * Shared module for parsing global props from TypeScript source files.
 * Used by both generate-ai-metadata.mjs and generate-global-props-metadata.mjs
 * to ensure a single source of truth.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PATHS = {
  globalPropsTs: path.resolve(__dirname, '../../app/pb_kits/playbook/utilities/globalProps.ts'),
  typesDir: path.resolve(__dirname, '../../app/pb_kits/playbook/types'),
};

// =============================================================================
// TYPE REGISTRY (exported for use by generate-global-props-metadata.mjs)
// =============================================================================

export class TypeRegistry {
  constructor() {
    this.types = new Map();
  }

  register(name, definition) {
    this.types.set(name, definition);
  }

  resolve(typeExpr, visited = new Set()) {
    if (!typeExpr) return null;
    
    typeExpr = typeExpr.trim();
    
    if (visited.has(typeExpr)) return null;
    visited.add(typeExpr);
    
    if (this.types.has(typeExpr)) {
      const def = this.types.get(typeExpr);
      if (typeof def === 'string') {
        return this.resolve(def, visited);
      }
      return def;
    }
    
    if (typeExpr.includes('|')) {
      return this.resolveUnion(typeExpr, visited);
    }
    
    if (typeExpr.startsWith('"') || typeExpr.startsWith("'")) {
      return { type: 'enum', values: [typeExpr.slice(1, -1)] };
    }
    
    if (/^\d+$/.test(typeExpr)) {
      return { type: 'enum', values: [parseInt(typeExpr, 10)] };
    }
    
    if (typeExpr === 'boolean') return { type: 'boolean' };
    if (typeExpr === 'string') return { type: 'string' };
    if (typeExpr === 'number') return { type: 'number' };
    
    return null;
  }

  resolveUnion(unionExpr, visited = new Set()) {
    const parts = this.splitUnion(unionExpr);
    const values = [];
    let hasObject = false;
    let hasString = false;
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      
      if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
          (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        values.push(trimmed.slice(1, -1));
        continue;
      }
      
      if (/^\d+$/.test(trimmed)) {
        values.push(parseInt(trimmed, 10));
        continue;
      }
      
      if (trimmed === "'max'" || trimmed === '"max"') {
        values.push('max');
        continue;
      }
      
      if (trimmed.startsWith('{')) {
        hasObject = true;
        continue;
      }
      
      if (trimmed === 'string') {
        hasString = true;
        continue;
      }
      
      const resolved = this.resolve(trimmed, new Set(visited));
      if (resolved?.values) {
        values.push(...resolved.values);
      } else if (resolved?.type === 'string') {
        hasString = true;
      }
    }
    
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
// PARSING FUNCTIONS (exported for use by generate-global-props-metadata.mjs)
// =============================================================================

export function parseTypeDefinitions(content, registry) {
  const typePattern = /(?:export\s+)?type\s+(\w+)\s*=\s*([^;{]+?)(?:;|\n|$)/g;
  let match;
  
  while ((match = typePattern.exec(content)) !== null) {
    const [, typeName, typeExpr] = match;
    registry.register(typeName, typeExpr.trim());
  }
  
  const constArrayPattern = /export\s+const\s+(\w+)\s*=\s*\[([^\]]+)\]\s*as\s+const/g;
  while ((match = constArrayPattern.exec(content)) !== null) {
    const [, constName, values] = match;
    const parsedValues = values.split(',').map(v => {
      v = v.trim();
      if (v.startsWith('"') || v.startsWith("'")) return v.slice(1, -1);
      if (/^\d+$/.test(v)) return parseInt(v, 10);
      return v;
    });
    registry.register(constName, { type: 'enum', values: parsedValues });
  }
}

export function parsePropsFromBlock(block, registry) {
  const props = {};
  const propPattern = /(\w+)\??:\s*([^,\n]+)/g;
  let match;
  
  while ((match = propPattern.exec(block)) !== null) {
    const [, propName, typeExpr] = match;
    if (propName === 'break' || propName === 'default') continue;
    
    const resolved = registry.resolve(typeExpr.trim());
    if (resolved) {
      props[propName] = resolved;
    }
  }
  
  return props;
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

/**
 * Parse global props from TypeScript source and return:
 * - globalPropNames: Set of all global prop names
 * - globalPropTypes: Object with prop definitions
 */
export function parseGlobalProps() {
  const registry = new TypeRegistry();
  
  // Parse imported types
  const typeFiles = ['sizes.ts', 'display.ts', 'base.ts', 'spacing.ts'];
  for (const file of typeFiles) {
    const filePath = path.join(PATHS.typesDir, file);
    if (fs.existsSync(filePath)) {
      parseTypeDefinitions(fs.readFileSync(filePath, 'utf8'), registry);
    }
  }
  
  // Parse globalProps.ts
  const content = fs.readFileSync(PATHS.globalPropsTs, 'utf8');
  parseTypeDefinitions(content, registry);
  
  // Parse object-style type definitions
  const objectTypePattern = /type\s+(\w+)\s*=\s*\{([^}]+)\}/g;
  let match;
  const typeProps = {};
  
  while ((match = objectTypePattern.exec(content)) !== null) {
    const [, typeName, propsBlock] = match;
    typeProps[typeName] = parsePropsFromBlock(propsBlock, registry);
  }
  
  // Parse Hover type
  const hoverMatch = content.match(/type\s+Hover\s*=\s*Shadow\s*&\s*\{([^}]+)\}/);
  if (hoverMatch && typeProps['Shadow']) {
    typeProps['Hover'] = {
      ...typeProps['Shadow'],
      ...parsePropsFromBlock(hoverMatch[1], registry),
    };
  }
  
  // Extract GlobalProps type members
  const globalPropsMatch = content.match(/export\s+type\s+GlobalProps\s*=\s*([^;]+)/);
  const globalPropTypeNames = globalPropsMatch
    ? globalPropsMatch[1].split('&').map(t => t.trim().replace(/[{}\s]/g, '')).filter(t => t && !t.includes(':'))
    : [];
  
  // Collect all global prop names
  const globalPropNames = new Set();
  const globalPropDefs = {};
  
  for (const typeName of globalPropTypeNames) {
    const props = typeProps[typeName];
    if (props) {
      for (const [propName, propDef] of Object.entries(props)) {
        globalPropNames.add(propName);
        globalPropDefs[propName] = propDef;
      }
    }
  }
  
  // Add hover and groupHover
  globalPropNames.add('hover');
  globalPropNames.add('groupHover');
  
  return {
    globalPropNames,
    globalPropDefs,
    hoverProps: typeProps['Hover'] || {},
  };
}

/**
 * Get just the set of global prop names (for filtering in kit generation)
 */
export function getGlobalPropNames() {
  const { globalPropNames } = parseGlobalProps();
  return globalPropNames;
}
