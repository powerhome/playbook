Use `markdownSupport` to convert recognizable Markdown from the clipboard into formatted TipTap content when it is pasted into the editor. Pass the parser and serializer together through `markdownSupport`; Playbook owns the conversion, safe clipboard detection, and TipTap insertion while the consuming application supplies the libraries.

Markdown support is opt-in for backward compatibility. Omit `markdownSupport` to keep TipTap's standard paste behavior. Rich HTML and ordinary plain text also continue through the standard paste path when Markdown syntax is not detected.

The example uses `prosemirror-markdown` and `prosemirror-model`. These parser packages are not included in the `playbook-ui` runtime bundle.
