const path = require('path')
const externalRuntimeGuard = require('./external-runtime-guard-plugin')
const { REPO_ROOT, globToRegExp } = require('../../../scripts/lib/external-runtime-deps')

const allowlist = [{
  host: 'basemaps.cartocdn.com',
  paths: ['playbook/app/pb_kits/playbook/pb_map/**'],
  matchers: [globToRegExp('playbook/app/pb_kits/playbook/pb_map/**')],
}]
const kitFile = (relative) => path.join(REPO_ROOT, 'playbook/app/pb_kits/playbook', relative)
const context = { error: (message) => { throw new Error(message) } }

const generate = (bundle) => externalRuntimeGuard({ allowlist }).generateBundle.call(context, {}, bundle)
const chunk = (modules) => ({ type: 'chunk', fileName: 'chunks/x.js', modules })

describe('externalRuntimeGuard', () => {
  test('fails the build on a runtime-built esm.sh URL and names the source file (pre-#6868 regression)', () => {
    const bundle = {
      'chunks/x.js': chunk({
        [kitFile('pb_rich_text_editor/rich_text_editor_rails.js')]: {
          code: 'const RTE_TIPTAP_ESM = (pkg) => `https://esm.sh/${pkg}@${RTE_TIPTAP_VERSION}`;\nawait import(RTE_TIPTAP_ESM("@tiptap/core"));',
        },
      }),
    }

    expect(() => generate(bundle)).toThrow(/pb_rich_text_editor\/rich_text_editor_rails\.js loads script from esm\.sh/)
  })

  test('flags third-party code bundled from node_modules', () => {
    const bundle = { 'chunks/x.js': chunk({ [path.join(REPO_ROOT, 'node_modules/some-lib/index.js')]: { code: 'loadScript("https://cdn.example.net/x.js")' } }) }

    expect(() => generate(bundle)).toThrow(/node_modules\/some-lib\/index\.js loads script from cdn\.example\.net/)
  })

  test('passes allowlisted hosts in their allowed paths, local lazy chunks, and tree-shaken modules', () => {
    const bundle = {
      'chunks/x.js': chunk({
        [kitFile('pb_map/pbMapTheme.ts')]: { code: "style: 'https://basemaps.cartocdn.com/gl/style.json'" },
        [kitFile('pb_rich_text_editor/rich_text_editor_rails.js')]: { code: 'import("./chunks/index-abc123.js")' },
        [kitFile('pb_card/card.tsx')]: { code: null },
      }),
      'playbook.css': { type: 'asset', fileName: 'playbook.css', source: '.a{background:url(./assets/x.svg)}' },
    }

    expect(() => generate(bundle)).not.toThrow()
  })

  test('does not extend an exception beyond its paths', () => {
    const bundle = { 'chunks/x.js': chunk({ [kitFile('pb_card/card.tsx')]: { code: "fetch('https://basemaps.cartocdn.com/x')" } }) }

    expect(() => generate(bundle)).toThrow(/pb_card\/card\.tsx loads network from basemaps\.cartocdn\.com/)
  })

  test('scans built CSS', () => {
    const bundle = { 'playbook.css': { type: 'asset', fileName: 'playbook.css', source: '@import url(https://fonts.googleapis.com/css2?family=X);' } }

    expect(() => generate(bundle)).toThrow(/playbook\/dist\/playbook\.css loads stylesheet from fonts\.googleapis\.com/)
  })

  describe('build-stage exceptions', () => {
    const buildEntry = (host, glob) => ({ host, stage: 'build', paths: [glob], matchers: [globToRegExp(glob)] })
    const buildAllowlist = [
      buildEntry('fonts.googleapis.com', 'playbook/dist/playbook.css'),
      buildEntry('cdn.example.net', 'node_modules/some-lib/**'),
    ]
    const generateWith = (list, bundle) => externalRuntimeGuard({ allowlist: list }).generateBundle.call(context, {}, bundle)
    const bundle = {
      'chunks/x.js': chunk({ [path.join(REPO_ROOT, 'node_modules/some-lib/index.js')]: { code: 'loadScript("https://cdn.example.net/x.js")' } }),
      'playbook.css': { type: 'asset', fileName: 'playbook.css', source: '@import url(https://fonts.googleapis.com/css2?family=X);' },
    }

    test('approve findings in built CSS and bundled node_modules code', () => {
      expect(() => generateWith(buildAllowlist, bundle)).not.toThrow()
    })

    test('fail the build when they no longer match the output', () => {
      expect(() => generateWith(buildAllowlist, { 'chunks/x.js': chunk({}) }))
        .toThrow(/Stale build exceptions[\s\S]*fonts\.googleapis\.com in playbook\/dist\/playbook\.css[\s\S]*cdn\.example\.net/)
    })

    test('source-stage exceptions are not reported as stale by the build', () => {
      expect(() => generate({ 'chunks/x.js': chunk({}) })).not.toThrow()
    })
  })

  test('rejects literal remote import specifiers before Vite marks them external', () => {
    const plugin = externalRuntimeGuard({ allowlist })
    const importer = kitFile('pb_rich_text_editor/rich_text_editor_rails.js')

    expect(() => plugin.resolveId.call(context, 'https://esm.sh/prosemirror-model@1.25.0', importer))
      .toThrow(/rich_text_editor_rails\.js loads script from esm\.sh/)
    expect(plugin.resolveId.call(context, '@tiptap/core', importer)).toBeNull()
  })
})
