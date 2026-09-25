### Playbook-owned extensions

The Rails kit accepts a closed list of string extension names: `underline`, `text_align`, `horizontal_rule`, and `image`. Playbook owns their TipTap schema and renders enabled actions in the toolbar's ellipsis menu. Required packages load from esm.sh, so host apps do not need TipTap npm dependencies.

The image control prompts for an external image URL and inserts it into the document. It does not upload files or integrate with an asset pipeline.

`simple: true` hides these toolbar controls even when `extensions` is set, while enabled schemas continue to parse their existing HTML.
