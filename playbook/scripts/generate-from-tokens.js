#!/usr/bin/env node

/**
 * Token-First Generator
 * 
 * Generates SCSS and JSON from the YAML token source of truth.
 * 
 * Usage:
 *   node scripts/generate-from-tokens.js
 *   yarn generate:from-tokens
 * 
 * Outputs:
 *   - app/pb_kits/playbook/tokens/_colors.generated.scss  (SCSS variables)
 *   - lib/playbook/tokens/colors.json                      (Resolved values for Rails)
 */

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

// Simple color math functions
const ColorMath = {
  // Parse hex to RGB
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },

  // RGB to hex
  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(Math.min(255, Math.max(0, x))).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  },

  // Lighten a color by percentage
  lighten(hex, percent) {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return hex
    const amount = percent / 100
    return this.rgbToHex(
      rgb.r + (255 - rgb.r) * amount,
      rgb.g + (255 - rgb.g) * amount,
      rgb.b + (255 - rgb.b) * amount
    )
  },

  // Darken a color by percentage
  darken(hex, percent) {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return hex
    const amount = percent / 100
    return this.rgbToHex(
      rgb.r * (1 - amount),
      rgb.g * (1 - amount),
      rgb.b * (1 - amount)
    )
  },

  // Mix two colors
  mix(hex1, hex2, weight = 50) {
    const rgb1 = this.hexToRgb(hex1)
    const rgb2 = this.hexToRgb(hex2)
    if (!rgb1 || !rgb2) return hex1
    const w = weight / 100
    return this.rgbToHex(
      rgb1.r * w + rgb2.r * (1 - w),
      rgb1.g * w + rgb2.g * (1 - w),
      rgb1.b * w + rgb2.b * (1 - w)
    )
  },

  // Create rgba string
  rgba(hex, alpha) {
    const rgb = this.hexToRgb(hex)
    if (!rgb) return hex
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
  }
}

class TokenGenerator {
  constructor(yamlPath) {
    this.yamlPath = yamlPath
    this.tokens = {}
    this.resolved = {}
    this.scssVars = []
  }

  load() {
    const content = fs.readFileSync(this.yamlPath, 'utf8')
    const data = yaml.load(content)
    
    // Flatten all categories into a single tokens object
    for (const [category, tokens] of Object.entries(data)) {
      for (const [name, definition] of Object.entries(tokens)) {
        this.tokens[name] = { ...definition, category }
      }
    }
    
    console.log(`📖 Loaded ${Object.keys(this.tokens).length} tokens from YAML`)
  }

  // Resolve a token to its final value
  resolve(name, visited = new Set()) {
    if (this.resolved[name]) {
      return this.resolved[name]
    }

    if (visited.has(name)) {
      throw new Error(`Circular reference detected: ${name}`)
    }
    visited.add(name)

    const token = this.tokens[name]
    if (!token) {
      // Might be a literal hex value
      if (name.startsWith('#')) {
        return name
      }
      throw new Error(`Unknown token: ${name}`)
    }

    let value

    if (token.value) {
      // Direct value
      value = token.value
    } else if (token.alias) {
      // Alias to another token
      value = this.resolve(token.alias, visited)
    } else if (token.derive) {
      // Computed value
      value = this.computeDerived(token.derive, visited)
    } else {
      throw new Error(`Token ${name} has no value, alias, or derive`)
    }

    this.resolved[name] = value
    return value
  }

  computeDerived(derive, visited) {
    const { from, op, amount, alpha, with: mixWith } = derive
    
    // Resolve the source color
    const sourceColor = from.startsWith('#') ? from : this.resolve(from, visited)
    
    // Parse amount (e.g., "10%" -> 10)
    const numAmount = amount ? parseFloat(amount.replace('%', '')) : 0

    switch (op) {
      case 'lighten':
        return ColorMath.lighten(sourceColor, numAmount)
      case 'darken':
        return ColorMath.darken(sourceColor, numAmount)
      case 'mix': {
        const mixColor = mixWith.startsWith('#') ? mixWith : this.resolve(mixWith, visited)
        return ColorMath.mix(mixColor, sourceColor, numAmount)
      }
      case 'rgba':
        return ColorMath.rgba(sourceColor, alpha)
      default:
        throw new Error(`Unknown operation: ${op}`)
    }
  }

  // Generate SCSS variable reference (for aliases and derives)
  getScssReference(name) {
    const token = this.tokens[name]
    if (!token) {
      return name.startsWith('#') ? name : `$${name}`
    }

    if (token.value) {
      return token.value
    } else if (token.alias) {
      return `$${token.alias}`
    } else if (token.derive) {
      return this.getScssDerive(token.derive)
    }
    return `$${name}`
  }

  getScssDerive(derive) {
    const { from, op, amount, alpha, with: mixWith } = derive
    const source = from.startsWith('#') ? from : `$${from}`
    
    switch (op) {
      case 'lighten':
        return `lighten(${source}, ${amount})`
      case 'darken':
        return `darken(${source}, ${amount})`
      case 'mix': {
        const mix = mixWith.startsWith('#') ? mixWith : `$${mixWith}`
        return `mix(${mix}, ${source}, ${amount})`
      }
      case 'rgba':
        return `rgba(${source}, ${alpha})`
      default:
        return source
    }
  }

  generateScss() {
    const lines = [
      '// =============================================================================',
      '// AUTO-GENERATED — DO NOT EDIT',
      '// Generated from tokens/colors.yml',
      '// Run: yarn generate:from-tokens',
      '// =============================================================================',
      '',
      '@import "./opacity";',
      ''
    ]

    // Group by category
    const categories = {}
    for (const [name, token] of Object.entries(this.tokens)) {
      const cat = token.category
      if (!categories[cat]) categories[cat] = []
      categories[cat].push({ name, ...token })
    }

    for (const [category, tokens] of Object.entries(categories)) {
      lines.push(`/* ${category.charAt(0).toUpperCase() + category.slice(1)} Colors */`)
      
      for (const token of tokens) {
        const scssValue = this.getScssReference(token.name)
        lines.push(`$${token.name}: ${scssValue} !default;`)
      }
      lines.push('')
    }

    return lines.join('\n')
  }

  generateJson() {
    // Resolve all tokens
    for (const name of Object.keys(this.tokens)) {
      this.resolve(name)
    }

    // Sort for consistent output
    const sorted = Object.keys(this.resolved).sort().reduce((obj, key) => {
      obj[key] = this.resolved[key]
      return obj
    }, {})

    return JSON.stringify(sorted, null, 2)
  }

  generate() {
    this.load()

    // Generate SCSS
    const scss = this.generateScss()
    const scssPath = path.join(__dirname, '../app/pb_kits/playbook/tokens/_colors.generated.scss')
    fs.writeFileSync(scssPath, scss)
    console.log(`✅ Generated ${scssPath}`)

    // Generate JSON (with resolved values)
    const json = this.generateJson()
    const jsonPath = path.join(__dirname, '../lib/playbook/tokens/colors.json')
    fs.mkdirSync(path.dirname(jsonPath), { recursive: true })
    fs.writeFileSync(jsonPath, json)
    console.log(`✅ Generated ${jsonPath}`)
    console.log(`✅ Resolved ${Object.keys(this.resolved).length} color values`)
  }
}

// Check for js-yaml dependency
try {
  require('js-yaml')
} catch (e) {
  console.error('❌ Missing dependency: js-yaml')
  console.error('   Run: yarn add js-yaml --dev')
  process.exit(1)
}

// Run generator
const yamlPath = path.join(__dirname, '../tokens/colors.yml')
const generator = new TokenGenerator(yamlPath)
generator.generate()

