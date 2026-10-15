Enable `allowOptionCreation` in React or `allow_option_creation` in Rails to select text that is not already an option. This also enables autocomplete on the default trigger. With custom subcomponents, provide an autocomplete trigger or a searchable container. Creation is supported for single and multiple selections, including async search; it is ignored for the quickpick variant.

Type a new value and click the `Create "…"` row, or use the arrow keys and Enter. Creation trims surrounding whitespace, rejects blank text, and suppresses case-insensitive matches against existing or selected labels, values, and IDs. The selected object is `{ id: text, label: text, value: text, __isNew__: true }`. The Create label is presentation only. Creation does not persist a server record or append to application-owned options; persist selections through your normal form submission or selection handler.

React native form submission additionally requires `enableFormSupport`; option creation alone does not enable it. Rails retains its existing native form support.

React uses the existing `onSelect(optionOrArray)` and `onChange({ target: { name, value } })` callbacks. Rails emits its normal `pb:dropdown:selected` event. Multiple selections produce an array of option objects.

For async React usage, combine `allowOptionCreation` with `async` and your existing `loadOptions`; both Promise and callback loaders are supported. Rails uses `async: true` with the existing `pb:dropdown:search` event and `setResults`/`setError` callbacks. Creation is hidden during pending searches and errors, then offered when settled results have no exact match. Rails can offer creation below `search_term_minimum_length`, when no remote search runs. Applications that manage React fetching themselves must pass `loading` while the request is pending.

In React, a non-empty search focuses the Create row when it is available; arrow keys can choose another option. Closing the menu or clearing the query removes automatic option focus. Enter with a closed menu or blank query remains available for normal form submission and does not change the selection.
