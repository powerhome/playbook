The Rails rich text editor is a TipTap surface with no React. The UI (toolbar, block-style menu, formatting actions) is rendered with Playbook Rails kits (`pb_rails`). The editor document is a vanilla TipTap `Editor` instance; HTML is synced to a hidden `<input>` so standard Rails forms can submit the value.

### How TipTap is loaded (Rails)

- The kit ships an `importmap` in the ERB template that maps `@tiptap/*` and ProseMirror packages to ES module URLs on a CDN (see `rich_text_editor.html.erb`). A small `type="module"` script `import()`s `@tiptap/core`, `@tiptap/starter-kit`, `@tiptap/extension-link`, and related modules at runtime.
- You do not need to add TipTap to your app’s npm dependencies or Gemfile for this kit to work out of the box—the browser loads those modules from the CDN when the page runs.
- Your app must support import maps and ES modules in the browser (modern browsers; ensure CSP allows the CDN if you lock scripts down).

### Relation to the React implementation

- Same core: both use TipTap v2 on top of ProseMirror; styling lives in Playbook SCSS (`_tiptap_styles.scss`) so the editor chrome lines up between platforms.
- Different shell: Rails uses ERB + Playbook Rails components + inline module script. React uses `RichTextEditor` / `_tiptap_editor.tsx` and TipTap wired through the bundled Playbook React package—see Advanced Default for that stack and when you need TipTap installed in your JavaScript bundle.

### Simple toolbar (`simple: true`)

**Bold**, **Italic**, **Undo**, and **Redo** only (no block dropdown / Popover). See the **Rails (TipTap — Simple toolbar)** example.
