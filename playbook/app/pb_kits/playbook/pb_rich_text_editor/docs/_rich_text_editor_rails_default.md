The Rails rich text editor is a TipTap surface with no React. The UI (toolbar, block-style menu, formatting actions) is rendered with Playbook Rails kits (`pb_rails`). The editor document is a vanilla TipTap `Editor` instance; HTML is synced to a hidden `<input>` so standard Rails forms can submit the value.

### How TipTap is loaded (Rails)

- The kit’s module script (`rich_text_editor_rails.js`) uses `import()` with **full URLs** on [esm.sh](https://esm.sh) (e.g. `@tiptap/core@2.8.0`). esm.sh resolves dependencies server-side, so **no `<script type="importmap">`** is required—this avoids conflicts when the host page already has an import map (e.g. Vite in dev, or another app map) because Firefox only applies one native map.
- You do not need TipTap in your app’s npm dependencies or Gemfile for this kit; the browser loads modules from esm.sh when the page runs.
- Ensure **CSP** allows loading scripts from `https://esm.sh` (and esm.sh’s redirected module URLs) if you use a strict `script-src` / `connect-src`.

### Relation to the React implementation

- Same core: both use TipTap v2 on top of ProseMirror; styling lives in Playbook SCSS (`_tiptap_styles.scss`) so the editor chrome lines up between platforms.
- Different shell: Rails uses ERB + Playbook Rails components + inline module script. React uses `RichTextEditor` / `_tiptap_editor.tsx` and TipTap wired through the bundled Playbook React package—see Advanced Default for that stack and when you need TipTap installed in your JavaScript bundle.
