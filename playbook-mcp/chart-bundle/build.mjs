#!/usr/bin/env node
// Build self-contained IIFEs for MCP-UI iframes (charts + playbook-rails kit JS).
import { createRequire } from "node:module"
import { mkdirSync, readFileSync, existsSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const mcpRoot = resolve(__dirname, "..")
const repoRoot = resolve(mcpRoot, "..")
const vendorRoot = resolve(mcpRoot, "vendor/chart-peers")

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

function resolveSourceFile(absolute) {
  if (existsSync(absolute) && statSync(absolute).isFile()) return absolute
  for (const ext of [".js", ".jsx", ".ts", ".tsx"]) {
    const withExt = `${absolute}${ext}`
    if (existsSync(withExt) && statSync(withExt).isFile()) return withExt
  }
  if (existsSync(absolute) && statSync(absolute).isDirectory()) {
    for (const name of ["index.js", "index.ts", "index.tsx", "index.jsx"]) {
      const indexPath = join(absolute, name)
      if (existsSync(indexPath)) return indexPath
    }
  }
  return absolute
}

const aliasPlugin = {
  name: "playbook-aliases",
  setup(build) {
    for (const [name, target] of Object.entries(aliases)) {
      build.onResolve({ filter: new RegExp(`^${name}(/|$)`) }, (args) => {
        const rest = args.path.slice(name.length).replace(/^\//, "")
        const absolute = rest ? join(target, rest) : target
        return { path: resolveSourceFile(absolute) }
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

const stubAssetPlugin = {
  name: "stub-assets",
  setup(build) {
    build.onLoad({ filter: /\.(css|png|jpe?g|gif|woff2?|ttf|eot)$/ }, () => ({
      contents: "export default {}",
      loader: "js",
    }))
  },
}

const shared = {
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2018"],
  resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  // React 17 workspace — classic JSX transform (no jsx-runtime requirement).
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
    ".ts": "ts",
    ".tsx": "tsx",
    ".svg": "text",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  plugins: [aliasPlugin, scssModulesPlugin, stubAssetPlugin],
  nodePaths: [
    resolve(repoRoot, "node_modules"),
    resolve(repoRoot, "playbook/node_modules"),
  ],
  logLevel: "info",
}

function assertIife(out, outfile) {
  if (/\/npm\/[^"' ]+\/(\+esm|es-modules)/.test(out)) {
    console.error(`ERROR: ${outfile} still references jsDelivr /npm/… paths`)
    process.exit(1)
  }
  if (out.includes("esm.sh")) {
    console.error(`ERROR: ${outfile} references esm.sh`)
    process.exit(1)
  }
  if (/^\s*(import|export)\s/m.test(out.slice(0, 200))) {
    console.error(`ERROR: ${outfile} looks like ESM, expected IIFE`)
    process.exit(1)
  }
  if (outfile.endsWith("playbook-rails.js") && !out.includes("data-pb-table-wrapper")) {
    console.error(`ERROR: ${outfile} is missing table wrapper selector`)
    process.exit(1)
  }
}

async function buildIife({ entry, outfile }) {
  mkdirSync(dirname(outfile), { recursive: true })
  await esbuild.build({
    ...shared,
    entryPoints: [entry],
    outfile,
  })
  const out = readFileSync(outfile, "utf8")
  assertIife(out, outfile)
  console.log(`Wrote ${out.length} bytes → ${outfile}`)
}

await buildIife({
  entry: resolve(__dirname, "entry.js"),
  outfile: resolve(vendorRoot, "playbook-charts.js"),
})

await buildIife({
  entry: resolve(repoRoot, "playbook/app/entrypoints/playbook-rails.js"),
  outfile: resolve(vendorRoot, "playbook-rails.js"),
})
