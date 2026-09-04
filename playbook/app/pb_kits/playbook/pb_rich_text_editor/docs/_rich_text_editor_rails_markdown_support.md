Set `markdown_support: true` to convert recognizable Markdown from the clipboard into formatted TipTap content. Supported formatting includes headings, bold and italic text, links, ordered and unordered lists, blockquotes, and fenced code blocks.

The prop is opt-in and defaults to `false`, so existing Rails Rich Text Editors retain TipTap's standard paste behavior. Rich HTML, tables, styled content, media, and ordinary plain text also remain on TipTap's native paste path.

When Markdown support is enabled, the Rails editor loads `prosemirror-markdown` and `prosemirror-model` from [esm.sh](https://esm.sh) before initializing. Applications with a strict Content Security Policy must allow esm.sh and its redirected module URLs.
