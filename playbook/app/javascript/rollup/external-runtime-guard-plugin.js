// Fails the Vite build when the output would load anything from a third-party host. This is the
// shipped-artifact half of the external runtime dependency guard (the source half is
// scripts/check-external-runtime-deps.js); see docs/EXTERNAL_RUNTIME_DEPS.md.
//
// - resolveId catches literal remote imports, e.g. import("https://esm.sh/pkg"), which Vite would
//   otherwise leave as external.
// - generateBundle scans each module's rendered code, so URLs built at runtime (the esm.sh outage
//   used `https://esm.sh/${pkg}`) are caught too, and findings point at the source file so the
//   same path-scoped exceptions apply. Rendered line numbers don't match the source, so they are
//   left out. Built CSS and bundled node_modules code have no kit source path, so they are covered by
//   "stage": "build" exceptions, which only this plugin checks for staleness.
const path = require('path')
const {
  REPO_ROOT,
  applyAllowlist,
  formatViolations,
  isBuildOnly,
  loadAllowlist,
  scanCode,
} = require('../../../scripts/lib/external-runtime-deps')

const REMOTE_SPECIFIER = /^(https?:)?\/\//
const SCANNED_ASSET = /\.css$/

const toRepoPath = (id) => (id && path.isAbsolute(id) ? path.relative(REPO_ROOT, id) : id || 'unknown')
const scanBuilt = (code, file, ext) => scanCode(code, file, ext).map((finding) => ({ ...finding, line: null }))

function externalRuntimeGuard({ allowlist = loadAllowlist() } = {}) {
  const fail = (context, findings, { checkStale = false } = {}) => {
    const { violations, unused } = applyAllowlist(findings, allowlist)
    const stale = checkStale ? unused.filter(isBuildOnly) : []
    const errors = []
    if (violations.length) errors.push(`External runtime dependencies in the build output:\n\n${formatViolations(violations)}`)
    if (stale.length) {
      errors.push(`Stale build exceptions (they no longer match the build output; remove them):\n${stale
        .map((entry) => `  - ${entry.host} in ${entry.paths.join(', ')}`).join('\n')}`)
    }
    if (errors.length) context.error(errors.join('\n\n'))
  }

  return {
    name: 'externalRuntimeGuard',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!REMOTE_SPECIFIER.test(source)) return null
      fail(this, scanBuilt(`import("${source}")`, toRepoPath(importer), '.js'))
      return null
    },
    generateBundle(options, bundle) {
      const outDir = options.dir ? path.relative(REPO_ROOT, options.dir) : 'playbook/dist'
      const findings = Object.values(bundle).flatMap((file) => {
        if (file.type === 'chunk') {
          return Object.entries(file.modules)
            .filter(([, mod]) => mod.code)
            .flatMap(([id, mod]) => scanBuilt(mod.code, toRepoPath(id), '.js'))
        }
        if (SCANNED_ASSET.test(file.fileName)) return scanBuilt(String(file.source), `${outDir}/${file.fileName}`, '.css')
        return []
      })
      fail(this, findings, { checkStale: true })
    },
  }
}

module.exports = externalRuntimeGuard
