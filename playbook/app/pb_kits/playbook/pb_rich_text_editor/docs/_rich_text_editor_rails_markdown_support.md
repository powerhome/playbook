Set `markdown_support: true` to convert recognizable Markdown from the clipboard into formatted TipTap content. Supported formatting includes headings, bold and italic text, links, ordered and unordered lists, blockquotes, and fenced code blocks.

The prop is opt-in and defaults to `false`, so existing Rails Rich Text Editors retain TipTap's standard paste behavior. Rich HTML, tables, styled content, media, and ordinary plain text also remain on TipTap's native paste path.

When Markdown support is enabled, the Rails editor lazily loads its bundled `prosemirror-markdown` and `prosemirror-model` chunks before initializing.
