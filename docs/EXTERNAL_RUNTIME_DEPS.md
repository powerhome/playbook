# External Runtime Dependencies

Playbook kits must not load code, styles, or data from third-party hosts at runtime. Install the dependency and let Vite bundle it.

## Why

On Oct 30, an esm.sh outage broke every Rails Rich Text Editor, because the kit loaded TipTap with `import()` from esm.sh URLs. It also forced every consuming app to allow esm.sh in its Content Security Policy. #6868 moved TipTap into the Vite bundle as lazy chunks, which keeps lazy loading but ships the code with the app.

The rule: if it runs in a consumer's browser, it ships with Playbook. Lazy-loaded local chunks (`import('@tiptap/core')`) are fine; `import('https://…')` is not.

## What enforces it

| Layer | Where | What it checks |
|-------|-------|----------------|
| Source scan | `yarn check:external-deps`: Overcommit, Husky pre-commit, and CI (`playbook/bin/build`) | Kit, entrypoint, `lib/`, and website source, including ERB, Ruby, and SCSS |
| Build guard | `externalRuntimeGuard` plugin in `playbook/vite.config.ts`: every `vite build`, including `yarn release` in the CI image build | Remote import specifiers, plus every module's rendered code and built CSS in the npm/gem output, including bundled `node_modules` code |
| Release preflight | `pb_release:push` (stable), and the alpha and RC jobs in `.github/workflows/github-actions-alpha-version.yml` | Runs the source scan before any version files change or anything is packaged. Stable releases also stop if `yarn release` fails, so a build-guard failure never reaches `npm pack` or `gem build` |

Both use [`playbook/scripts/lib/external-runtime-deps.js`](../playbook/scripts/lib/external-runtime-deps.js) and the same exceptions file.

The scan is host-based. Any `https://host`, `http://host`, or quoted `//host` in a string or template literal counts, so a URL built in a helper (`` `https://esm.sh/${pkg}` ``) is caught the same as `import("https://esm.sh/x")`.

**Not flagged:** comments (JS, SCSS, ERB, HTML, Ruby), `<a>` link targets, Markdown links, kit `docs/` examples, tests and fixtures, and a short list of reference-only hosts (`www.w3.org`, `developer.mozilla.org`, `reactjs.org`, …) that only appear in namespaces and error messages. `<link href>` is still flagged.

## Run it

```bash
yarn check:external-deps
```

## Fixing a failure

The failure names the file, host, URL, and kind (script, stylesheet, network, asset), and explains why it matters.

- **Script or module:** `yarn workspace playbook-ui add <pkg>` and import it by name. Use `import()` if it should load lazily; Vite emits a local chunk.
- **Stylesheet or font:** install the package and import its CSS/SCSS, or commit the font files.
- **Network call:** let the consuming app own the request (accept data, a URL, or a callback as a prop).
- **Image or other asset:** commit it, use one from an installed package, or accept the URL as a prop.

## Exceptions

Some hosts really cannot be bundled (for example map tile services). Add an entry to [`playbook/config/external-runtime-deps.json`](../playbook/config/external-runtime-deps.json):

```json
{
  "host": "basemaps.cartocdn.com",
  "paths": ["playbook/app/pb_kits/playbook/pb_map/pbMapTheme.ts"],
  "scope": "kit",
  "reason": "Why this can't be bundled.",
  "impact": "What consumers must add to their CSP, and what breaks if the host is down."
}
```

- `paths` are repo-relative globs (`*` within a folder, `**` across folders). Keep them as narrow as possible; an exception never covers a whole domain.
- `scope` is `kit` (ships to consumers), `website` (docs site only), or `tooling` (maintainer scripts).
- `kit` exceptions need maintainer review, and the `impact` should also be in the kit's docs so consumers know which CSP entries they need.
- An exception that no longer matches anything fails the check, so remove entries when the dependency goes away.

### Build-only findings

Some findings exist only in the Vite output: URLs in built CSS (reported as `playbook/dist/playbook.css`, since Vite merges all SCSS into one file) and URLs inside bundled dependencies (reported as `node_modules/<pkg>/…`). A source-path exception can't cover these. Add `"stage": "build"` and use the path from the build error:

```json
{
  "host": "cdn.example.net",
  "stage": "build",
  "paths": ["node_modules/some-lib/**"],
  "scope": "kit",
  "reason": "…",
  "impact": "…"
}
```

`yarn check:external-deps` ignores build-stage exceptions, since it never sees those paths. The Vite build checks them instead, and fails if one no longer matches the output.

## Limits

- The source scan uses heuristics, not a parser. Unusual comment or string layouts can cause misses or false positives; fix the code or add a narrow exception.
- URLs assembled entirely from runtime values (e.g. `'https://' + host`, or a URL passed in from config) cannot be detected statically. The build guard catches more than the source scan, but not this.
- A strict-CSP smoke test (render every kit under `script-src 'self'` and fail on violations) would close that gap; it is not implemented yet.
