# ask-playbook lookup reference

This read-only lookup is the repository-owned reference for the external Cursor
`ask-playbook` skill. It reads only the host's installed `playbook-ui/dist/ai`,
including installations under `components/*/node_modules`. It does not use this
repository's contracts as a fallback or install dependencies.

```sh
node lookup.mjs --root /path/to/host version
node lookup.mjs --root /path/to/host kit Dropdown
node lookup.mjs --root /path/to/host prop TextInput inputOptions
node lookup.mjs --root /path/to/host search dropdown_field
node lookup.mjs --root /path/to/host forms
node lookup.mjs --root /path/to/host forms text_field
```

To adopt this in the external skill, replace its `scripts/lookup.mjs` with this
file and update its instructions as follows:

- For Rails form questions, use `form.rails.builder` and its method examples.
  `usage.rails` remains the standalone kit example. Neither supersedes the other.
- Builder arguments and HTML options are separate from kit props. A builder
  argument does not add a Rails platform to a standalone kit prop.
- `kit` returns `form` and `faqs`; prop summaries retain all authored fields,
  including description, example and itemShape.
- `prop` returns form context and FAQs tagged for the prop. A missing kit prop
  remains an error, with any available builder context included for explanation.
- `search` also matches builder methods, FAQ questions and aliases. Use `kit` to
  retrieve the matching answers. `forms [method]` returns the builder inventory
  or a specific method; `forms actions` returns action-area usage.
- Only state facts in the returned installed metadata. Missing fields, a null
  contract, or an explicit unknown status mean the installed metadata does not
  say. Explicit false means unsupported for the stated API/context.
- The output includes the selected `aiDir` and `version`. If `alsoFound` lists
  additional installations, target the intended package with `--root`; do not
  mix facts from different installed versions.
- Playbook owns `pb_form_with` and `Playbook::Forms::Builder`. Host overlays may
  document other helpers and adapters, but must not change the core contract.

Older metadata remains readable: `kit` returns `form: null` and `faqs: []`, and
`forms` reports that the installed metadata does not describe builder contracts.
The local external skill is not automatically updated by changes in this repo.
