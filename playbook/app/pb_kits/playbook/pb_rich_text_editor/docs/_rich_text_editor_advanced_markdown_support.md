Use `markdownSupport` to convert recognizable Markdown from the clipboard into formatted TipTap content when it is pasted into the editor. Supported formatting includes headings, bold and italic text, links, ordered and unordered lists, blockquotes, and fenced code blocks.

Markdown support is opt-in for backward compatibility. It defaults to `false`, so existing editors continue to use TipTap's standard paste behavior. Rich HTML and ordinary plain text also continue through the standard paste path when Markdown syntax is not detected.

For React, pass `markdownSupport` to the advanced Rich Text Editor as shown below. For Rails, use the snake-case equivalent:

```erb
<%= pb_rails("rich_text_editor", props: {
  markdown_support: true
}) %>
```
