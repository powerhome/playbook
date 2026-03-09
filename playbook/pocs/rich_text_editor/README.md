# Rich Text Editor (RTE) Alternatives – POCs

Proof-of-concept demos for **Rails-friendly** rich text editors that replace Trix **without** using React in the Rails kit. See the full migration plan: **[docs/RICH_TEXT_EDITOR_MIGRATION.md](../../docs/RICH_TEXT_EDITOR_MIGRATION.md)**.

All POCs use the **Playbook design system** via the shared `playbook-rte-tokens.css` and the `.pb_rich_text_editor_kit` wrapper class, so typography (Power Centra, 15.5px, line-height 1.4), colors (#242B42, #828EA7, #FFFFFF), border radius, padding, and focus states match the existing Trix/trix-editor kit.

**On the Playbook website** these POCs are also available via a route and the docs sidebar:
- **Guide page**: `/guides/getting_started/rte_pocs` (lists and links to all POCs)
- **TipTap POC**: `/pocs/rich_text_editor/tiptap_vanilla/`
- **Quill POC**: `/pocs/rich_text_editor/quill/`

The website serves the same HTML from `playbook-website/public/pocs/rich_text_editor/`.

## POCs

| POC | Description | How to run |
|-----|-------------|------------|
| **[TipTap Vanilla](./tiptap_vanilla/)** | TipTap core (no React) on a div; toolbar + hidden input sync. Same engine as React TipTap; output is HTML. | Open `index.html` in a browser. If ESM/CORS blocks (e.g. `file://`), run a local server: `npx serve tiptap_vanilla` or `python3 -m http.server --directory tiptap_vanilla 8080`. |
| **[Quill](./quill/)** | Quill editor on a div; Snow theme; sync to hidden input. | Open `index.html` in a browser (CDN works from file). |
| **[Lexxy](./lexxy/)** | Lexxy (37signals) from CDN; `<lexxy-editor>` form control. Attachments disabled in demo. | Open `index.html` in a browser or run a local server (ESM). See [lexxy/README.md](./lexxy/README.md) for Rails gem setup. |

## What each POC shows

- **TipTap Vanilla**: No React; init with `new Editor({ element, extensions, ... })`; sync `editor.getHTML()` to a hidden input so a Rails form can submit the same way as with Trix. Toolbar built with plain DOM (could be a Stimulus controller in Rails).
- **Quill**: No React; init with `new Quill('#editor', { theme: 'snow' })`; sync `quill.root.innerHTML` to hidden input. Fits Stimulus + Rails forms.
- **Lexxy**: Not runnable as a single HTML file; notes and optional Rails app instructions for when you want to try it.

## Rails integration (conceptual)

For **TipTap** or **Quill** in a real Rails app:

1. **ERB** renders a wrapper div + a hidden `<input type="hidden" name="...">`.
2. A **Stimulus controller** (or a small vanilla script) finds the wrapper, inits the editor (TipTap or Quill), and on change updates the hidden input’s value.
3. Form submit sends the HTML (or, for Quill, optionally Delta JSON) to the server. Server sanitizes (e.g. Rails `sanitize` or a dedicated sanitizer) and stores (e.g. Action Text or a `text` column).
4. On edit, preload the editor with the stored HTML.

Playbook theming can be applied via CSS on the toolbar and editor container (both POCs use a simple toolbar/container you can restyle with Playbook tokens).

## Recommendation

From the migration doc:

- **First choice**: **TipTap (vanilla JS)** – aligns with React TipTap (same format), no React in Rails, extensible.
- **Fallback**: **Quill** – mature, Rails-friendly, no React.
- **Later**: **Lexxy** – re-evaluate when stable and feature-complete for Action Text.

## Running TipTap POC with a local server

From this directory (`playbook/pocs/rich_text_editor/`):

```bash
# Option 1: npx serve (serve current dir or a subdir)
npx serve tiptap_vanilla
# Open http://localhost:3000

# Option 2: Python
python3 -m http.server 8080 --directory tiptap_vanilla
# Open http://localhost:8080
```

Quill’s `index.html` uses script tags and CDN CSS/JS, so it usually works by opening the file directly in the browser.
