const fs = require('fs')
const {
  ALLOWLIST_PATH,
  applyAllowlist,
  formatViolations,
  globToRegExp,
  loadAllowlist,
  scanCode,
} = require('./external-runtime-deps')

const hosts = (findings) => findings.map((finding) => finding.host)
const entry = (host, paths) => ({ host, paths, matchers: paths.map(globToRegExp) })

describe('scanCode', () => {
  test('flags the pre-#6868 Rich Text Editor esm.sh loader (URL built in a helper, passed to import())', () => {
    // Trimmed from rich_text_editor_rails.js before e3b5615aa; the Oct 30 esm.sh outage broke this.
    const source = [
      '// Rails TipTap: dynamic import() from esm.sh (no import map).',
      'const RTE_TIPTAP_VERSION = "3.0.7";',
      'const RTE_TIPTAP_ESM = (pkg) => `https://esm.sh/${pkg}@${RTE_TIPTAP_VERSION}`;',
      'async function loadOptionalExtensions(extensionNames, importer = (pkg) => import(RTE_TIPTAP_ESM(pkg))) {}',
      'const { Editor } = await import(RTE_TIPTAP_ESM("@tiptap/core"));',
      'const [md, model] = await Promise.all([',
      '  import("https://esm.sh/prosemirror-markdown@1.13.2"),',
      '  import("https://esm.sh/prosemirror-model@1.25.0"),',
      ']);',
    ].join('\n')

    const findings = scanCode(source, 'pb_rich_text_editor/rich_text_editor_rails.js')

    expect(findings.map(({ line, host, kind }) => ({ line, host, kind }))).toEqual([
      { line: 3, host: 'esm.sh', kind: 'script' },
      { line: 7, host: 'esm.sh', kind: 'script' },
      { line: 8, host: 'esm.sh', kind: 'script' },
    ])
    expect(findings[0].url).toBe('https://esm.sh/${pkg}@${RTE_TIPTAP_VERSION}')
  })

  test.each([
    ['inline script tag in ERB', '<script type="module" src="https://unpkg.com/x@1/index.js"></script>', 'x.html.erb', 'unpkg.com', 'script'],
    ['protocol-relative script URL', 'loadScript("//cdn.jsdelivr.net/npm/x")', 'x.js', 'cdn.jsdelivr.net', 'script'],
    ['stylesheet link tag', '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=X">', 'x.html.erb', 'fonts.googleapis.com', 'stylesheet'],
    ['SCSS remote import', '@import url("https://fonts.googleapis.com/css2?family=X");', 'x.scss', 'fonts.googleapis.com', 'stylesheet'],
    ['fetch call', 'fetch(`https://api.github.com/search/users?q=${q}`)', 'x.tsx', 'api.github.com', 'network'],
    ['asset URL', "style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',", 'x.ts', 'basemaps.cartocdn.com', 'asset'],
  ])('flags %s', (_name, code, file, host, kind) => {
    expect(scanCode(code, file)).toEqual([expect.objectContaining({ host, kind, line: 1 })])
  })

  test.each([
    ['JS line comment', '// see https://esm.sh/docs', 'x.js'],
    ['trailing JS comment', 'const a = 1 // https://unpkg.com/x', 'x.js'],
    ['block comment / license banner', '/*!\n * @license https://some-lib.dev/LICENSE\n */\nconst a = 1', 'x.js'],
    ['ERB comment', '<%# Loaded from https://esm.sh %>', 'x.html.erb'],
    ['HTML comment', '<!-- https://esm.sh -->', 'x.html.erb'],
    ['Ruby comment', '  # https://esm.sh/thing', 'x.rb'],
    ['anchor link', '<a href="https://webaim.org/x">https://webaim.org/x</a>', 'x.tsx'],
    ['Markdown link', 'MSG = "See [here](https://playbook.powerapp.cloud/changelog)"', 'x.rb'],
    ['SVG namespace', 'createElementNS("http://www.w3.org/2000/svg", "svg")', 'x.js'],
    ['library error-message link', 'var b="https://reactjs.org/docs/error-decoder.html?invariant="+a', 'x.js'],
    ['division that looks like //', 'const half = total //2', 'x.js'],
  ])('ignores %s', (_name, code, file) => {
    expect(scanCode(code, file)).toEqual([])
  })

  test('reference hosts match exactly, so a subdomain used for fetching is still flagged', () => {
    expect(hosts(scanCode('fetch("https://api.github.com/x")', 'x.js'))).toEqual(['api.github.com'])
  })

  test('keeps template expressions containing quotes in the reported URL', () => {
    expect(scanCode("const u = `https://esm.sh/${'a'}@1`", 'x.js')[0].url).toBe("https://esm.sh/${'a'}@1")
  })

  test('reports a host once per line', () => {
    expect(scanCode('src="https://a.cdn.dev/x" data-fallback="https://a.cdn.dev/y"', 'x.erb')).toHaveLength(1)
  })
})

describe('applyAllowlist', () => {
  const findings = [
    { file: 'playbook/app/pb_kits/playbook/pb_map/pbMapTheme.ts', host: 'basemaps.cartocdn.com' },
    { file: 'playbook/app/pb_kits/playbook/pb_card/card.tsx', host: 'basemaps.cartocdn.com' },
  ]

  test('allows a host only in the listed paths, not across the whole domain', () => {
    const allowlist = [entry('basemaps.cartocdn.com', ['playbook/app/pb_kits/playbook/pb_map/**'])]

    expect(applyAllowlist(findings, allowlist)).toEqual({ violations: [findings[1]], unused: [] })
  })

  test('reports exceptions that no longer match anything', () => {
    const stale = entry('esm.sh', ['playbook/app/pb_kits/playbook/pb_rich_text_editor/**'])

    expect(applyAllowlist([], [stale]).unused).toEqual([stale])
  })
})

describe('globToRegExp', () => {
  test('* stays within a folder; ** crosses folders', () => {
    expect(globToRegExp('a/*.ts').test('a/b.ts')).toBe(true)
    expect(globToRegExp('a/*.ts').test('a/b/c.ts')).toBe(false)
    expect(globToRegExp('a/**').test('a/b/c.ts')).toBe(true)
  })
})

describe('formatViolations', () => {
  test('names the location and host, and explains why and how to fix', () => {
    const output = formatViolations([{ file: 'kit.js', line: 3, host: 'esm.sh', url: 'https://esm.sh', kind: 'script' }])

    expect(output).toContain('kit.js:3 loads script from esm.sh')
    expect(output).toMatch(/Why: .*CSP script-src/)
    expect(output).toMatch(/Fix: Install the package/)
    expect(output).toContain('external-runtime-deps.json')
  })
})

describe('allowlist file', () => {
  test('every exception is scoped to paths and documents its reason and consumer impact', () => {
    const { exceptions } = JSON.parse(fs.readFileSync(ALLOWLIST_PATH, 'utf8'))

    exceptions.forEach((exception) => {
      expect(exception).toEqual(expect.objectContaining({
        host: expect.stringMatching(/^[a-z0-9.-]+$/),
        paths: expect.arrayContaining([expect.stringMatching(/^playbook(-website)?\//)]),
        scope: expect.stringMatching(/^(kit|website|tooling)$/),
        reason: expect.any(String),
        impact: expect.any(String),
      }))
    })
    expect(() => loadAllowlist()).not.toThrow()
  })
})
