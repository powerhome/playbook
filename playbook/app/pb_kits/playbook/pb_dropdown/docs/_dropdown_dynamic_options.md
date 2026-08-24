You can set up a dropdown to update its options dynamically based on another input (for example, a color select that drives shade options). To achieve this:
- Give the dropdown a unique `id` so it can be targeted by events and linked to a controlling input.
- Use `context_selector` to point at the controlling select’s `id`. On connect, and whenever that select’s value changes, the Dropdown reads the current value as its context.
- Use `options_by_context` to pass a hash of option lists. Keys must match the possible values of the controlling select; each key maps to an array of `{ id, label, value }` options that replace the Dropdown’s options for that context.
- Use `clear_on_context_change` (defaults to `true`) to clear the Dropdown’s current selection whenever the controlling select changes. Set it to `false` if you want to keep a selection that still exists in the new options.

You can also replace options imperatively by dispatching `pb:dropdown:updateOptions` with `detail: { dropdownId, options }`, or by setting `options_event_type` to a comma-separated list of custom/Turbo event names. When those events fire with `detail.options` (and optional `detail.dropdownId`), the matching Dropdown updates its options.
