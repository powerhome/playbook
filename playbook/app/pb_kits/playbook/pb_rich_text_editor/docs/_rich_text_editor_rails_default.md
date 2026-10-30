The Rails rich text editor is a TipTap surface with no React. The UI (toolbar, block-style menu, formatting actions) is rendered with Playbook Rails kits (`pb_rails`). The editor document is a vanilla TipTap `Editor` instance; HTML is synced to a hidden `<input>` so standard Rails forms can submit the value.

### How TipTap is loaded (Rails)

- TipTap is bundled into `playbook-rails.js` and split into lazy chunks, so it only downloads on pages that render a Rails rich text editor. Editors mount automatically through the Playbook kit registry, including ones inserted after page load (e.g. Turbo frames or dialogs).
- You do not need TipTap in your app’s npm dependencies or Gemfile for this kit, and nothing is loaded from a third-party CDN, so no CSP exception is required.

### Relation to the React implementation

- Same core: both use TipTap v3 on top of ProseMirror; styling lives in Playbook SCSS (`_tiptap_styles.scss`) so the editor chrome lines up between platforms.
- Different shell: Rails uses ERB + Playbook Rails components + `playbook-rails.js`. React uses `RichTextEditor` / `_tiptap_editor.tsx` and TipTap wired through the bundled Playbook React package—see Advanced Default for that stack and when you need TipTap installed in your JavaScript bundle.
