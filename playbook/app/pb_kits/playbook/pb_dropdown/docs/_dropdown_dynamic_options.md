Dropdown options can be replaced at runtime without a page reload. Use this for dependent fields (for example, a region select that determines city options) or for data loaded from Turbo/custom events.

## Declarative: `options_by_context`

Similar to Typeahead, pass a hash of option arrays keyed by the value of a controlling input:

- Give the dependent dropdown a unique `id`
- Set `context_selector` to the id of the controlling select (or other input)
- Pass `options_by_context` with keys matching the controller's possible values
- Optionally set `clear_on_context_change` to `false` to keep the current selection when the context changes (defaults to `true`)

Each option uses the standard Dropdown shape: `{ id, label, value }`. If `id` is omitted, `value` is used.

## Imperative: `pb:dropdown:updateOptions`

Dispatch a document-level custom event to replace options for a specific dropdown:

```javascript
document.dispatchEvent(new CustomEvent("pb:dropdown:updateOptions", {
  detail: {
    dropdownId: "city-dropdown",
    options: [
      { id: "nyc", label: "New York", value: "nyc" },
      { id: "la", label: "Los Angeles", value: "la" },
    ],
    clearSelection: true, // optional, defaults to true
  },
}));
```

## Custom and Turbo events: `options_event_type`

Set `options_event_type` to a comma-separated list of event names. When any of those events fire with `detail.options` (and optional `detail.dropdownId`), the matching dropdown replaces its options. This works well with Turbo frame loads or app-specific events:

```javascript
document.dispatchEvent(new CustomEvent("cities:loaded", {
  detail: {
    dropdownId: "city-dropdown",
    options: [{ id: "chi", label: "Chicago", value: "chi" }],
  },
}));
```

Existing external control events (`pb:dropdown:clear`, `pb:dropdown:select`, and `custom_event_type` for clearing) continue to work alongside option updates.
