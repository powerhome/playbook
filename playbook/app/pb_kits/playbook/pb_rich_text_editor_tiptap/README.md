# Rich Text Editor (TipTap) — Vanilla JS Kit

This kit loads TipTap from CDN via an **import map** so the editor runs without a build step.

## Using in your app

Use a Playbook gem that includes this kit, include Playbook CSS, and (if you use CSP) allow `cdn.jsdelivr.net` and inline scripts. For full details see the docs guide **Rich Text Editor POCs**.

## Drawbacks of the current approach

- **Deep dependency tree**: TipTap and ProseMirror pull in many packages (`orderedmap`, `w3c-keyname`, `rope-sequence`, `@tiptap/extension-text-style`, etc.). Each must be listed in the import map or the browser fails with "Failed to resolve module specifier".
- **Whack-a-mole**: Adding one missing dependency can surface another. The list may grow when TipTap or ProseMirror versions change.
- **Version pinning**: All mapped packages are pinned to specific versions. Upgrading TipTap may require updating the import map and re-testing.

## Recommended alternative for production

**Use a single bundled script** instead of the import map:

1. In your app (e.g. playbook-website), add a small build step that bundles TipTap once:
   ```js
   // tiptap-bundle.js (built with esbuild, rollup, etc.)
   import { Editor } from '@tiptap/core'
   import StarterKit from '@tiptap/starter-kit'
   import Link from '@tiptap/extension-link'
   export { Editor, StarterKit, Link }
   ```
2. Serve the output (e.g. `tiptap-bundle.js`) from your assets or CDN.
3. In this kit’s template, replace the import map + bare-specifier `import()` with a single script that loads that bundle and then creates the editor.

That way there are no import-map entries to maintain, and you get one consistent dependency set.

## When this kit is still useful

- **Docs/demos**: Showing the kit on the Playbook docs site with the import map is fine; we add dependencies as needed.
- **Quick Rails-only setups**: If you can’t add a front-end build, the import map is the only no-build option; just be aware more deps may need to be added over time.
