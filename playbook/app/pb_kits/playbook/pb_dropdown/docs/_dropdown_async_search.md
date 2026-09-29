Rails Dropdown supports event-driven remote search with `async: true` and either `autocomplete: true` or `searchbar: true`. Local Dropdown filtering remains unchanged when async is disabled.

Type at least `search_term_minimum_length` characters (default: `3`). After `search_debounce_timeout` milliseconds without another edit (default: `250`), the kit opens the menu, displays a loading message, and emits a bubbling `pb:dropdown:search` event from the Dropdown root. Scope listeners using the root's `id` or `data` attributes.

The event detail contains:

- `searchingFor`: the current query.
- `setResults(options)`: complete the search with an array of standard Dropdown option objects (`id`, `label`, `value`) or rich `{ option, content }` entries. Use an empty array for no matches.
- `setError()`: end loading and display a failure message.

The application owns fetching and mapping results. For example, call `fetch(yourUrl).then(...)`, check `response.ok`, map the response to options, pass them to `setResults`, and call `setError` on failure. The example simulates network latency without an external service.

Results are displayed without additional local label filtering and without clearing the typed query. Callbacks are request-scoped: subsequent edits, selection, clear/reset, and disconnect invalidate earlier requests. Only the first completion is accepted. Requests that do not complete within 15 seconds display a failure message. The kit ignores stale responses; it does not abort application-owned network requests.

For rich results, `content` is an Element or DocumentFragment cloned into the option wrapper; `option` supplies the label and selection data. See Async Search with Custom Content for a Rails template example.

Async Quick Pick is not supported; Quick Pick uses static date presets.

#### Selection data and defaults

`pb:dropdown:selected` bubbles from the Dropdown root after selection updates. Its existing detail shape is unchanged: the complete option object for single-select, an array for multi-select, and `null` / `[]` when cleared. Custom JSON-serializable fields, nested objects, booleans, and arrays are preserved; rendered rich content is not included. For example, read `event.detail.department_id` to update a dependent field. Numeric IDs retain their type in the event payload; form inputs submit strings.

Selected data is retained independently of remote result rows. A later search returning different options does not discard the selection or its metadata. In multi-select, previously selected IDs remain hidden when they reappear, even if the server returns updated labels or other fields. The selected payload stays as it was when selected until the selection is explicitly changed.

To initialize an async Dropdown before any results load, supply a complete `default_value` option object (an array for multi-select), including `id` and `label`. For example: `async: true, autocomplete: true, options: [], default_value: { id: 42, label: "Ada", department_id: 7 }`. When using `dropdown_field`, pass that explicit default: the builder cannot resolve an initial model ID from an empty options array.
