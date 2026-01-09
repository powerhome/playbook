#!/usr/bin/env node

/**
 * Generate Rails color tokens from SCSS
 * 
 * This script compiles the SCSS color module using Sass,
 * extracts the :export block, and generates a JSON file
 * that Ruby can read at runtime.
 * 
 * Usage:
 *   node scripts/generate-tokens.js
 *   yarn generate:tokens
 * 
 * This runs automatically during `yarn release`.
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const SCSS_SOURCE = path.join(__dirname, '../app/pb_kits/playbook/tokens/exports/_colors.module.scss')
const LOAD_PATH = path.join(__dirname, '../app/pb_kits/playbook')
const OUTPUT_PATH = path.join(__dirname, '../lib/playbook/tokens/colors.json')

console.log('🎨 Generating Rails color tokens from SCSS...\n')

// Compile SCSS using Sass
// This resolves ALL values: variables, mix(), lighten(), darken(), rgba(), etc.
let cssOutput
try {
  cssOutput = execSync(
    `yarn sass --load-path="${LOAD_PATH}" --no-source-map "${SCSS_SOURCE}"`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  )
} catch (error) {
  console.error('❌ Error compiling SCSS:')
  console.error(error.stderr || error.message)
  process.exit(1)
}

// Extract the :export block from compiled CSS
const exportMatch = cssOutput.match(/:export\s*\{([^}]+)\}/s)
if (!exportMatch) {
  console.error('❌ Could not find :export block in compiled CSS')
  console.error('CSS output:', cssOutput.substring(0, 500))
  process.exit(1)
}

const exportContent = exportMatch[1]

// Parse key-value pairs from the export block
// Format: "  key: value;" or "  key: #hexvalue;"
const colors = {}
const regex = /([a-zA-Z_][a-zA-Z0-9_-]*):\s*([^;]+);/g
let match

while ((match = regex.exec(exportContent)) !== null) {
  const key = match[1].trim().replace(/-/g, '_')
  const value = match[2].trim()
  colors[key] = value
}

if (Object.keys(colors).length === 0) {
  console.error('❌ No colors extracted from :export block')
  process.exit(1)
}

// Sort keys for consistent diffs
const sortedColors = Object.keys(colors)
  .sort()
  .reduce((obj, key) => {
    obj[key] = colors[key]
    return obj
  }, {})

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_PATH)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Write JSON file
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sortedColors, null, 2))

console.log(`✅ Generated ${OUTPUT_PATH}`)
console.log(`✅ Exported ${Object.keys(colors).length} color tokens\n`)

// Show sample values
console.log('Sample values:')
const samples = ['royal', 'card_dark', 'hover_light', 'success_secondary', 'data_4']
samples.forEach(key => {
  if (colors[key]) {
    console.log(`  ${key}: ${colors[key]}`)
  }
})
console.log('')

