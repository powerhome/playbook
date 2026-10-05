Rails Dropdown supports event-driven remote search with `async: true` and either `autocomplete: true` or `searchbar: true`. Local Dropdown filtering remains unchanged when async is disabled.

Type at least `search_term_minimum_length` characters (default: `3`). After `search_debounce_timeout` milliseconds without another edit (default: `250`), the kit opens the menu, displays a loading message, and emits a bubbling `pb:dropdown:search` event from the Dropdown root. Scope listeners using the root's `id` or `data` attributes.

The event detail contains:

- `searchingFor`: the current query.
- `setResults(options)`: complete the search with an array of standard Dropdown option objects (`id`, `label`, `value`) or rich `{ option, content }` entries. Use an empty array for no matches.
- `setError()`: end loading and display a failure message.

The application owns fetching and mapping results. For example, call `fetch(yourUrl).then(...)`, check `response.ok`, map the response to options, pass them to `setResults`, and call `setError` on failure. This example searches [DummyJSON’s public sample users API](https://dummyjson.com/docs/users) over HTTPS without credentials or an API key. Try `Emily` or `Michael`. The API receives the search text and returns up to 10 results; only name fields are requested. HTTP or network failures display the kit’s error state.

Results are displayed without additional local label filtering and without clearing the typed query. Callbacks are request-scoped: subsequent edits, selection, clear/reset, dismissal with Escape/Tab or an outside click, and disconnect invalidate pending requests. Dismissing during the debounce delay cancels the search before it starts; completed results and status messages remain available when reopening. Only the first completion is accepted. Requests that do not complete within 15 seconds display a failure message. The kit ignores stale responses; it does not abort application-owned network requests.

For rich results, `content` is an Element or DocumentFragment cloned into the option wrapper; `option` supplies the label and selection data. See Async Search with Custom Content for a Rails template example.

Async Quick Pick is not supported; Quick Pick uses static date presets.

#### Selection data and defaults

`pb:dropdown:selected` bubbles from the Dropdown root after selection updates. Its existing detail shape is unchanged: the complete option object for single-select, an array for multi-select, and `null` / `[]` when cleared. Custom JSON-serializable fields, nested objects, booleans, and arrays are preserved; rendered rich content is not included. For example, read `event.detail.department_id` to update a dependent field. Numeric IDs retain their type in the event payload; form inputs submit strings.

Selected data is retained independently of remote result rows. A later search returning different options does not discard the selection or its metadata. In multi-select, previously selected IDs remain hidden when they reappear, even if the server returns updated labels or other fields. The selected payload stays as it was when selected until the selection is explicitly changed.

To initialize an async Dropdown before any results load, supply a complete `default_value` option object (an array for multi-select), including `id` and `label`. For example: `async: true, autocomplete: true, options: [], default_value: { id: 42, label: "Ada", department_id: 7 }`. When using `dropdown_field`, pass that explicit default: the builder cannot resolve an initial model ID from an empty options array.

#### Input and reset events

With `async: true`, `pb:dropdown:input` bubbles from the Dropdown root immediately on every edit, including text below the search minimum. Its detail is `{ value, reason }`:

- `reason: "input"`: the autocomplete or search-bar text was edited. `value` is the current text, without debouncing.
- `reason: "clear"`: the clear control or public `pb:dropdown:clear` command cleared the Dropdown. `value` is `""`.
- `reason: "reset"`: a native form reset cleared the Dropdown. `value` is `""`.

Selection changes continue to use `pb:dropdown:selected`; choosing an option does not emit an input event. For free-text forms such as a name search, maintain a separate field from both events:

```javascript
dropdown.addEventListener("pb:dropdown:input", ({ detail }) => {
  nameField.value = detail.value;
  // Application-owned IDs can be invalidated on any edit.
  userIdField.value = "";
});
dropdown.addEventListener("pb:dropdown:selected", ({ detail }) => {
  nameField.value = detail?.label || "";
  userIdField.value = detail?.id ?? "";
});
```

Editing nonempty text retains the Dropdown's selected value until it is changed or cleared. Emptying a single-select autocomplete clears its selected ID and emits `pb:dropdown:selected` with `null`. Emptying a search-bar query does not discard the selected option; emptying a multi-select query does not discard selected pills.

Explicit clear and native form reset clear query text, selection, remote results, loading/error messages, and pending callbacks, and close the menu. They emit the normal cleared selection payload (`null` or `[]`) and the input notification. Native reset completes after the browser resets form controls; a canceled reset leaves kit state intact. Reset clears the selection rather than restoring `default_value`, matching the kit's existing reset convention.

After clear, clicking an async autocomplete does not open an empty menu. The menu opens when a search starts or results/status content is available. An async search-bar menu can still open so its input remains accessible.

The clear control is also available for an unselected async query unless `clearable: false`. No async input notifications, remote-result cleanup, or changed reset timing are applied to synchronous Dropdowns.

Use `no_options_text` to replace the empty results message. It applies to synchronous Dropdowns as well.
