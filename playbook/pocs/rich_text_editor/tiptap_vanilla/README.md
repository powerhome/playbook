# TipTap Vanilla JS POC

TipTap runs **without React**: same editor core as the React build, initialized with vanilla JS. Output (HTML/JSON) is compatible with React TipTap, so Rails and React can share one format.

## Run

- **Best**: From repo root or `playbook/pocs/rich_text_editor`, run a local server (ESM imports often need HTTP):
  ```bash
  npx serve tiptap_vanilla
  # or: python3 -m http.server 8080 --directory tiptap_vanilla
  ```
- Open `index.html` in the browser. If you see CORS or module errors, use the server.

## What this POC does

- Inits TipTap with `Editor` from `@tiptap/core`, `StarterKit`, and `Link` (via jsDelivr CDN; esm.sh can have ProseMirror peer-dependency issues).
- Renders a simple toolbar (bold, italic, lists, headings, link) and syncs content to a hidden input.
- On “Submit”, the form would send the HTML to Rails like a normal `rich_text_area` (server must sanitize).

## Rails integration path

1. ERB: wrapper div + hidden input with `name="model[content]"` (or your attribute).
2. Stimulus controller: on connect, `new Editor({ element: this.element.querySelector('[data-editor]'), extensions: [...], onUpdate: () => { hiddenInput.value = editor.getHTML() } })`.
3. Load initial content from server into `content: storedHtml` when creating the editor.

No React is required in the Rails app for this path.
