Because our default variant's toolbar requires [Tiptap's StarterKit](https://tiptap.dev/api/extensions/starter-kit) which may include features that are not relevant to your project or even block some custom extensions, optionally setting `advancedEditorToolbar` to `false` creates an editor without a toolbar, using only the minimum requirements.

**NOTE**: Omitting the Starter Kit requires that the editor’s default extensions (`document`, `paragraph`, and `text`) **must** be imported directly from Tiptap or as a custom extensions.
