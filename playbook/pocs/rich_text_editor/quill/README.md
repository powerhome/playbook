# Quill POC

Quill is a **framework-agnostic** rich text editor. This POC wires it to a hidden input so a Rails form can submit HTML like a traditional `rich_text_area`.

## Run

Open `index.html` in a browser (Quill is loaded from CDN; no server required for this demo).

## What this POC does

- Inits Quill on a div with the Snow theme (toolbar on top).
- On every change, copies `quill.root.innerHTML` into a hidden input.
- Submit sends that HTML to the server (Rails would sanitize and store it).

## Rails integration path

1. ERB: container div + hidden input with the right `name` for your model attribute.
2. Stimulus controller: on connect, `new Quill(container, { theme: 'snow' })`, then `quill.on('text-change', () => { hiddenInput.value = quill.root.innerHTML })`.
3. When editing, set initial content: `quill.root.innerHTML = storedHtml` (or use `quill.setContents` with Delta if you store Delta JSON).

Quill is themeable with CSS (no iframe), so Playbook tokens can be applied to the toolbar and editor area.
