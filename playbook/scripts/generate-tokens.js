#!/usr/bin/env node

/**
 * Generate Rails token JSON files from Playbook SCSS.
 *
 * Currently: all color tokens from _colors.module.scss (legacy + accessible).
 * - Compiles _colors.module.scss, writes every :export key to
 *   lib/playbook/tokens/colors.json for Playbook::Tokens.colors
 * - When you add or change color tokens (in _colors.scss, _colors_accessible.scss,
 *   or _colors.module.scss), run this script and stage the updated colors.json — or
 *   Overcommit will run it on commit and fail until you do.
 *
 * Next steps (additional token types, e.g. typography, spacing):
 * - One JSON per type (typography.json, spacing.json, …) and one method per type in tokens.rb.
 * - For each type: add SCSS source path and output path; same pattern
 *   (compile → extract :export → write). Extend this script (section or config + loop),
 *   then update .overcommit.yml and verify_tokens.sh to check each generated file.
 *
 * Usage (run from playbook/ directory):
 *   yarn generate:tokens
 *   node scripts/generate-tokens.js
 *
 * Overcommit runs this script on commit when token SCSS or types/colors.ts are staged (VerifyTokens hook).
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/* ---- Colors (legacy + accessible via _colors.module.scss). Add more token-type blocks below when expanding. ---- */
const SCSS_SOURCE = path.join(
  __dirname,
  "../app/pb_kits/playbook/tokens/exports/_colors.module.scss"
);
const LOAD_PATH = path.join(__dirname, "../app/pb_kits/playbook");
const OUTPUT_PATH = path.join(__dirname, "../lib/playbook/tokens/colors.json");

console.log(
  "🎨 Generating Rails color tokens from _colors.module.scss (all exported keys)...\n"
);

let cssOutput;
try {
  cssOutput = execSync(
    `yarn sass --load-path="${LOAD_PATH}" --no-source-map "${SCSS_SOURCE}"`,
    { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
  );
} catch (error) {
  console.error("❌ Error compiling SCSS:");
  console.error(error.stderr || error.message);
  process.exit(1);
}

const exportMatch = cssOutput.match(/:export\s*\{([^}]+)\}/s);
if (!exportMatch) {
  console.error("❌ Could not find :export block in compiled CSS");
  console.error("CSS output:", cssOutput.substring(0, 500));
  process.exit(1);
}

const exportContent = exportMatch[1];
const colors = {};
const regex = /([a-zA-Z_][a-zA-Z0-9_-]*):\s*([^;]+);/g;
let match;

while ((match = regex.exec(exportContent)) !== null) {
  const key = match[1].trim().replace(/-/g, "_");
  const value = match[2].trim();
  colors[key] = value;
}

if (Object.keys(colors).length === 0) {
  console.error("❌ No color keys found in :export");
  process.exit(1);
}

const sortedColors = Object.keys(colors)
  .sort()
  .reduce((obj, key) => {
    obj[key] = colors[key];
    return obj;
  }, {});

const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sortedColors, null, 2));

console.log(`✅ Generated ${OUTPUT_PATH}`);
console.log(`✅ Exported ${Object.keys(colors).length} color tokens\n`);

const samples = ["primary", "text_default", "input_text_error", "status_text_primary"];
console.log("Sample values:");
samples.forEach((key) => {
  if (colors[key]) {
    console.log(`  ${key}: ${colors[key]}`);
  }
});
console.log("");
