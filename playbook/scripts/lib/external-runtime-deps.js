/**
 * Shared core for the external runtime dependency guard.
 *
 * Finds origins (https://host, http://host, //host) in code that ships to consumers, so a kit cannot
 * quietly start loading scripts, styles, or data from a third-party host. Used by:
 *   - scripts/check-external-runtime-deps.js (pre-commit + CI source scan)
 *   - app/javascript/rollup/external-runtime-guard-plugin.js (Vite build output scan)
 *
 * Matching is host-based on purpose: the Oct 30 outage came from `https://esm.sh/${pkg}` built in a
 * helper and passed to import(), which a syntax rule looking for import("https://…") would miss.
 * See docs/EXTERNAL_RUNTIME_DEPS.md for the policy, exception process, and detection limits.
 */
const fs = require('fs')
const path = require('path')

const REPO_ROOT = path.resolve(__dirname, '../../..')
const ALLOWLIST_PATH = path.join(REPO_ROOT, 'playbook/config/external-runtime-deps.json')

// Hosts that only appear as links in error messages, license banners, and XML namespaces. Exact
// matches only, so e.g. api.github.com (a real fetch target) is still flagged.
const REFERENCE_HOSTS = new Set([
  'www.w3.org',
  'w3.org',
  'developer.mozilla.org',
  'github.com',
  'reactjs.org',
  'react.dev',
  'fb.me',
  'prosemirror.net',
  'jquery.org',
  'jqueryui.com',
  'api.jqueryui.com',
  'jedwatson.github.io',
  'example.com',
  'www.example.com',
])

const URL_PATTERN = /(https?:)?\/\/((?:[a-z0-9-]+\.)+[a-z]{2,})(?![a-z0-9-])/gi
const PROTOCOL_RELATIVE_PREFIX = /["'`(]$/
// Navigation links (inside <a>…</a>, or Markdown links) are clicked, not loaded. <link href> is still flagged.
const isNavigationLink = (before) => before.lastIndexOf('<a ') > before.lastIndexOf('</a>') || before.endsWith('](')

const blankOut = (match) => match.replace(/[^\n]/g, ' ')

// Replace comments with spaces so line numbers stay correct. Heuristic, not a parser.
function stripComments(code, ext) {
  if (['.rb'].includes(ext)) {
    return code.replace(/^\s*#.*$/gm, blankOut).replace(/\s#\s.*$/gm, blankOut)
  }
  let out = code
  if (['.erb', '.html'].includes(ext)) {
    out = out.replace(/<%#[\s\S]*?%>/g, blankOut).replace(/<!--[\s\S]*?-->/g, blankOut)
  }
  // `//` only starts a comment at line start or after whitespace; URLs have `:` before `//`.
  return out.replace(/\/\*[\s\S]*?\*\//g, blankOut).replace(/(^|\s)\/\/.*$/gm, blankOut)
}

function classify(line) {
  if (/import\s*\(|\bimport\s.+\bfrom\b|<script|\.m?js\b|esm\.sh|unpkg|jsdelivr|cdnjs|skypack/i.test(line)) return 'script'
  if (/@import|<link|stylesheet|\.css\b|fonts\.googleapis/i.test(line)) return 'stylesheet'
  if (/fetch\s*\(|XMLHttpRequest|axios|\.ajax|WebSocket|EventSource|sendBeacon/.test(line)) return 'network'
  return 'asset'
}

function scanCode(code, file, ext = path.extname(file)) {
  const findings = []
  const lines = stripComments(code, ext).split('\n')
  lines.forEach((line, index) => {
    const hostsOnLine = new Set()
    for (const match of line.matchAll(URL_PATTERN)) {
      const [, scheme, rawHost] = match
      const [url] = line.slice(match.index).match(/^(?:\$\{[^}]*\}|[^\s"'`)<>])+/)
      const before = line.slice(0, match.index)
      if (!scheme && !PROTOCOL_RELATIVE_PREFIX.test(before)) continue
      if (isNavigationLink(before)) continue
      const host = rawHost.toLowerCase()
      if (REFERENCE_HOSTS.has(host) || hostsOnLine.has(host)) continue
      hostsOnLine.add(host)
      findings.push({ file, line: index + 1, host, url, kind: classify(line) })
    }
  })
  return findings
}

function globToRegExp(glob) {
  const source = glob
    .split('**')
    .map((part) => part.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*').replace(/\?/g, '[^/]'))
    .join('.*')
  return new RegExp(`^${source}$`)
}

function loadAllowlist(file = ALLOWLIST_PATH) {
  const { exceptions } = JSON.parse(fs.readFileSync(file, 'utf8'))
  return exceptions.map((entry) => ({ ...entry, matchers: entry.paths.map(globToRegExp) }))
}

const isAllowed = (finding, entry) =>
  entry.host === finding.host && entry.matchers.some((matcher) => matcher.test(finding.file))

// Returns findings no exception covers, plus exceptions that no longer match anything.
function applyAllowlist(findings, allowlist) {
  const used = new Set()
  const violations = findings.filter((finding) => {
    const entry = allowlist.find((candidate) => isAllowed(finding, candidate))
    if (entry) used.add(entry)
    return !entry
  })
  return { violations, unused: allowlist.filter((entry) => !used.has(entry)) }
}

const WHY = {
  script: 'Loading code from another host means an outage there breaks the kit (the Oct 30 esm.sh outage took down every Rails Rich Text Editor), and every consumer must add this host to their CSP script-src.',
  stylesheet: 'Loading styles or fonts from another host means an outage there breaks rendering, and every consumer must add this host to their CSP style-src/font-src.',
  network: 'Calling another host at runtime makes the kit depend on that service being up, and every consumer must add it to their CSP connect-src.',
  asset: 'Loading assets from another host makes the kit depend on that service being up, and every consumer must add it to their CSP (img-src, connect-src, etc.).',
}

const FIX = {
  script: 'Install the package (yarn workspace playbook-ui add <pkg>) and import it by name; Vite bundles it, and import() still gives you a lazy chunk.',
  stylesheet: 'Install the package and import its CSS/SCSS, or add the font files to the repo.',
  network: 'Move the request into the consuming app (pass data or a URL in as a prop) instead of hard-coding the host in the kit.',
  asset: 'Add the asset to the repo or use one shipped by an installed package, or let consumers pass the URL in as a prop.',
}

function formatViolations(violations) {
  return violations
    .map((v) => [
      `✗ ${v.file}${v.line ? `:${v.line}` : ''} loads ${v.kind} from ${v.host}`,
      `    ${v.url}`,
      `    Why: ${WHY[v.kind]}`,
      `    Fix: ${FIX[v.kind]}`,
    ].join('\n'))
    .concat([
      '',
      'If this host truly cannot be bundled (e.g. a map tile service), add an exception with a reason and',
      'consumer impact to playbook/config/external-runtime-deps.json. See docs/EXTERNAL_RUNTIME_DEPS.md.',
    ])
    .join('\n')
}

module.exports = {
  ALLOWLIST_PATH,
  REPO_ROOT,
  applyAllowlist,
  formatViolations,
  globToRegExp,
  loadAllowlist,
  scanCode,
  stripComments,
}
