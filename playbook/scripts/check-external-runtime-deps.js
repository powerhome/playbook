#!/usr/bin/env node

/**
 * Fails when shipped kit or website source loads anything from a third-party host that is not in
 * playbook/config/external-runtime-deps.json, or when an exception there no longer matches anything.
 *
 * Run: yarn check:external-deps (from the repo root or playbook/)
 * Runs in pre-commit (Overcommit + Husky) and in CI via bin/build. The Vite build runs the same scan
 * on its output through external-runtime-guard-plugin.js. Policy: docs/EXTERNAL_RUNTIME_DEPS.md
 */
const fs = require('fs')
const path = require('path')
const {
  ALLOWLIST_PATH,
  REPO_ROOT,
  applyAllowlist,
  formatViolations,
  isBuildOnly,
  loadAllowlist,
  scanCode,
} = require('./lib/external-runtime-deps')

const SCAN_ROOTS = [
  'playbook/app/pb_kits',
  'playbook/app/entrypoints',
  'playbook/app/javascript',
  'playbook/lib',
  'playbook-website/app',
]
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.erb', '.rb', '.scss', '.css', '.html'])
// Not shipped runtime code: kit doc examples, tests, fixtures.
const SKIP_DIRS = new Set(['node_modules', 'docs', '__tests__', '__snapshots__', 'fixtures', 'spec', 'test', 'tests'])
const SKIP_FILE = /\.(test|spec|stories)\.[a-z]+$/

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full)
    } else if (EXTENSIONS.has(path.extname(entry.name)) && !SKIP_FILE.test(entry.name)) {
      yield full
    }
  }
}

function main() {
  const findings = SCAN_ROOTS
    .map((root) => path.join(REPO_ROOT, root))
    .filter((root) => fs.existsSync(root))
    .flatMap((root) => [...walk(root)])
    .flatMap((file) => scanCode(fs.readFileSync(file, 'utf8'), path.relative(REPO_ROOT, file)))

  // Build-stage exceptions cover paths this scan never sees; the Vite build guard checks those.
  const allowlist = loadAllowlist().filter((entry) => !isBuildOnly(entry))
  const { violations, unused } = applyAllowlist(findings, allowlist)
  const allowlistFile = path.relative(REPO_ROOT, ALLOWLIST_PATH)

  if (violations.length) {
    console.error(`\nExternal runtime dependencies found (${violations.length}):\n`)
    console.error(formatViolations(violations))
  }
  if (unused.length) {
    console.error(`\nStale exceptions in ${allowlistFile} (they no longer match anything; remove them):`)
    unused.forEach((entry) => console.error(`  - ${entry.host} in ${entry.paths.join(', ')}`))
  }
  if (violations.length || unused.length) process.exit(1)

  console.log(`✓ No unapproved external runtime dependencies (${findings.length} allowed by ${allowlistFile}).`)
}

main()
