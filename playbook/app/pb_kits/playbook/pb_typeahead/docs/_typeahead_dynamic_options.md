You can also set up a typeahead to render options dynamically based on input from a select. To achieve this:
- The typeahead must have a unique `id`
- Use the `search_context_selector` prop on the typeahead. The value here must match the id of the select so the Typeahead knows where to read the current "context" from.
- Use `options_by_context` to pass in a hash whose keys match the possible values of your “context” select. Each key maps to an array of { label, value } objects. The typeahead automatically displays only the subset of options matching the current context.
- Additionally, set `clear_on_context_change` to true if you want that whenever a selection is made in the select, the Typeahead automatically clears its current input/selection