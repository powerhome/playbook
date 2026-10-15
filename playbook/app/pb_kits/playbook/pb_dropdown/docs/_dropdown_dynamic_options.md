You can set up a dropdown to update its options dynamically based on another input. To achieve this:
- Give the dropdown a unique `id` so it can be targeted by events and linked to a controlling input.
- Use `context_selector` to point at the controlling select’s `id`. On connect, and whenever that select’s value changes, the Dropdown reads the current value as its context.
- Use `options_by_context` to pass a hash of option lists. Keys must match the possible values of the controlling select; each key maps to an array of `{ id, label, value }` options that replace the Dropdown’s options for that context.
