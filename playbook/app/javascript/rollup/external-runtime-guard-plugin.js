// Fails the Vite build when the output would load anything from a third-party host. This is the
// shipped-artifact half of the external runtime dependency guard (the source half is
// scripts/check-external-runtime-deps.js); see docs/EXTERNAL_RUNTIME_DEPS.md.
//
// - resolveId catches literal remote imports, e.g. import("https://esm.sh/pkg"), which Vite would
//   otherwise leave as external.
// - generateBundle scans each module's rendered code, so URLs built at runtime (the esm.sh outage
//   used `https://esm.sh/${pkg}`) are caught too, and findings point at the source file so the
//   same path-scoped exceptions apply. Rendered line numbers don't match the source, so they are
//   left out.
const path = require('path')
const {
  REPO_ROOT,
  applyAllowlist,
  formatViolations,
  loadAllowlist,
  scanCode,
} = require('../../../scripts/lib/external-runtime-deps')

const REMOTE_SPECIFIER = /^(https?:)?\/\//
const SCANNED_ASSET = /\.css$/

const toRepoPath = (id) => (id && path.isAbsolute(id) ? path.relative(REPO_ROOT, id) : id || 'unknown')
const scanBuilt = (code, file, ext) => scanCode(code, file, ext).map((finding) => ({ ...finding, line: null }))

function externalRuntimeGuard({ allowlist = loadAllowlist() } = {}) {
  const fail = (context, findings) => {
    const { violations } = applyAllowlist(findings, allowlist)
    if (violations.length) context.error(`External runtime dependencies in the build output:\n\n${formatViolations(violations)}`)
  }

  return {
    name: 'externalRuntimeGuard',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!REMOTE_SPECIFIER.test(source)) return null
      fail(this, scanBuilt(`import("${source}")`, toRepoPath(importer), '.js'))
      return null
    },
    generateBundle(_options, bundle) {
      const findings = Object.values(bundle).flatMap((file) => {
        if (file.type === 'chunk') {
          return Object.entries(file.modules)
            .filter(([, mod]) => mod.code)
            .flatMap(([id, mod]) => scanBuilt(mod.code, toRepoPath(id), '.js'))
        }
        if (SCANNED_ASSET.test(file.fileName)) return scanBuilt(String(file.source), `dist/${file.fileName}`, '.css')
        return []
      })
      fail(this, findings)
    },
  }
}

module.exports = externalRuntimeGuard
