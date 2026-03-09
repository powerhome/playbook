---
title: Rich Text Editor POCs (Trix Alternatives)
icon: code
description: Proof-of-concept demos for Rails-friendly rich text editors that work without React in the Rails kit.
---

This page links to live POC demos for replacing Trix with Rails-friendly alternatives. See the [migration plan](https://github.com/powerhome/playbook/blob/master/playbook/docs/RICH_TEXT_EDITOR_MIGRATION.md) in the repo for full context.

## Live POC demos

These run as standalone pages on this site (no React; editors sync to a hidden input for Rails-style form submission).

| POC | Description | Try it |
|-----|-------------|--------|
| **TipTap (Vanilla JS)** | Same engine as React TipTap; no React. Output is HTML, compatible with React TipTap. | [Open TipTap POC](/pocs/rich_text_editor/tiptap_vanilla/) |
| **Quill** | Mature, framework-agnostic editor; Snow theme; syncs HTML to hidden input. | [Open Quill POC](/pocs/rich_text_editor/quill/) |
| **Lexxy** | 37signals’ Action Text editor (Lexical-based). CDN demo; attachments disabled. Still in beta. | [Open Lexxy POC](/pocs/rich_text_editor/lexxy/) |

The same editors are also available as **separate Playbook kits** on the Rich Text Editor kit page: [kits/rich_text_editor/rails](/kits/rich_text_editor/rails) (scroll to “TipTap (Vanilla JS)”, “Quill”, “Lexxy”). Use `pb_rails("rich_text_editor_tiptap", ...)`, `pb_rails("rich_text_editor_quill", ...)`, or `pb_rails("rich_text_editor_lexxy", ...)` with the same props style as the main kit (`input_options`, `value`, `placeholder`, etc.).

## Routes

- **This guide**: `/guides/getting_started/rte_pocs` (you are here)
- **TipTap POC**: `/pocs/rich_text_editor/tiptap_vanilla/` — static HTML served from `public/`
- **Quill POC**: `/pocs/rich_text_editor/quill/` — static HTML served from `public/`
- **Lexxy POC**: `/pocs/rich_text_editor/lexxy/` — static HTML + Lexxy from CDN (attachments disabled)

The POC HTML files live in `playbook-website/public/pocs/rich_text_editor/`. They are plain HTML + CDN JS (no build step), so they are served by Rails as static assets and do not require a separate route in `config/routes.rb`.

## Using the kits in your app (e.g. nitro-web)

You can use the same kit helpers in any app that uses the Playbook gem (and optionally the Playbook npm package for styles). No extra setup is required beyond what you already do for Playbook.

### 1. Use a Playbook gem version that includes the kits

Point your app at a gem version that has the three Rails kits: `rich_text_editor_tiptap`, `rich_text_editor_quill`, `rich_text_editor_lexxy`. Then you can copy-paste the doc examples:

```erb
<%= pb_rails("rich_text_editor_tiptap", props: { input_options: { id: 'hidden_input_id', name: "hidden_input_name" }, value: "Add your text here. You can format your text, add links, quotes, and bullets." }) %>
<%= pb_rails("rich_text_editor_quill", props: { input_options: { id: 'hidden_input_id', name: "hidden_input_name" }, value: "Add your text here." }) %>
<%= pb_rails("rich_text_editor_lexxy", props: { input_options: { id: 'lexxy_editor_id', name: "hidden_input_name" }, placeholder: "Write something…" }) %>
```

### 2. Include Playbook CSS

The editors rely on Playbook’s styles (toolbar, buttons, ProseMirror, etc.). If your app already loads the full Playbook styles (e.g. from the Playbook npm package or the gem’s compiled CSS), you don’t need to do anything else. The main `playbook.scss` entry already imports the rich text editor (and TipTap) styles.

### 3. No extra JavaScript in your app

TipTap, Quill, and Lexxy are loaded by the kits from CDNs (jsDelivr, unpkg, esm.sh) via the rendered HTML. You do **not** need to add `@tiptap/*`, `quill`, or `lexxy` to your own npm bundle.

### 4. Content Security Policy (CSP)

If your app uses a strict CSP, allow:

- **script-src**: `cdn.jsdelivr.net`, `unpkg.com`, `esm.sh`, and inline scripts (or use nonces for the kit’s inline scripts).
- The kits also inject inline `<style>` and `<script type="importmap">` / `<script type="module">`; if you restrict those, you’ll need to allow them or refactor the kits to use external assets.

With the above, copy-pasting the doc examples is enough; no other app setup is required.

## Recommendation

From the migration doc: **TipTap (vanilla JS)** is the recommended replacement for Trix (same format as React TipTap; no React in Rails). **Quill** is the fallback. **Lexxy** is worth re-evaluating once it reaches a stable release.
