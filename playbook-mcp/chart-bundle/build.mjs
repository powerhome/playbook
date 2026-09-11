#!/usr/bin/env node
// Build a self-contained IIFE for MCP-UI chart iframes.
import { createRequire } from "node:module"
import { mkdirSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const mcpRoot = resolve(__dirname, "..")
const repoRoot = resolve(mcpRoot, "..")
const entry = resolve(__dirname, "entry.js")
const outfile = resolve(mcpRoot, "vendor/chart-peers/playbook-charts.js")

const esbuild = require(resolve(repoRoot, "node_modules/esbuild"))
const sass = require(resolve(repoRoot, "node_modules/sass"))

function parseExportBlock(css) {
  const match = css.match(/:export\s*\{([\s\S]*?)\}/)
  if (!match) return {}
  const exports = {}
  for (const part of match[1].split(";")) {
    const line = part.trim()
    if (!line || line.startsWith("/*")) continue
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (key) exports[key] = value
  }
  return exports
}

const aliases = {
  kits: resolve(repoRoot, "playbook/app/pb_kits/playbook"),
  tokens: resolve(repoRoot, "playbook/app/pb_kits/playbook/tokens"),
  utilities: resolve(repoRoot, "playbook/app/pb_kits/playbook/utilities"),
}

const aliasPlugin = {
  name: "playbook-aliases",
  setup(build) {
    for (const [name, target] of Object.entries(aliases)) {
      build.onResolve({ filter: new RegExp(`^${name}(/|$)`) }, (args) => {
        const rest = args.path.slice(name.length).replace(/^\//, "")
        return { path: rest ? join(target, rest) : target }
      })
    }
  },
}

const scssModulesPlugin = {
  name: "scss-modules",
  setup(build) {
    build.onLoad({ filter: /\.module\.scss$/ }, (args) => {
      const result = sass.compile(args.path, {
        loadPaths: [
          resolve(repoRoot, "playbook/app/pb_kits/playbook/tokens"),
          resolve(repoRoot, "playbook/app/pb_kits/playbook"),
        ],
        quietDeps: true,
        silenceDeprecations: ["import", "global-builtin", "color-functions"],
      })
      const tokens = parseExportBlock(result.css)
      return {
        contents: `export default ${JSON.stringify(tokens)}`,
        loader: "js",
      }
    })

    build.onLoad({ filter: /\.scss$/ }, () => ({
      contents: "export default {}",
      loader: "js",
    }))
  },
}

mkdirSync(dirname(outfile), { recursive: true })

await esbuild.build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2018"],
  // React 17 workspace — classic JSX transform (no jsx-runtime requirement).
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
    ".ts": "ts",
    ".tsx": "tsx",
  },
  plugins: [aliasPlugin, scssModulesPlugin],
  nodePaths: [
    resolve(repoRoot, "node_modules"),
    resolve(repoRoot, "playbook/node_modules"),
  ],
  logLevel: "info",
})

const out = readFileSync(outfile, "utf8")
if (/\/npm\/[^"' ]+\/(\+esm|es-modules)/.test(out)) {
  console.error("ERROR: bundle still references jsDelivr /npm/… paths")
  process.exit(1)
}
if (out.includes("esm.sh")) {
  console.error("ERROR: bundle references esm.sh")
  process.exit(1)
}
if (/^\s*(import|export)\s/m.test(out.slice(0, 200))) {
  console.error("ERROR: bundle looks like ESM, expected IIFE")
  process.exit(1)
}

console.log(`Wrote ${out.length} bytes → ${outfile}`)
