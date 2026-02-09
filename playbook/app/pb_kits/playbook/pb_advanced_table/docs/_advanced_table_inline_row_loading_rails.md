### inline_row_loading
By default, the kit assumes that the initial dataset is complete, rendering expansion controls only when children are present. If, however, you want to implement lazy-loading patterns where children are fetched only when a parent is expanded, use the `inline_row_loading` prop.

When `inline_row_loading` is set to `true`:
- Expansion controls are rendered for rows with empty `children` arrays (you must pass `children: []` to any row that will have children loaded later)
- When such a row is expanded, an inline loading indicator appears until the child data is loaded
- This enables lazy-loading patterns without one-off hacks

In the first table above, row "2021" has an empty `children` array. Click to expand it and see the inline loading state. Rows 2 and 3 have actual child data.

This prop is set to `false` by default.

### persist_toggle_expansion_button
The `persist_toggle_expansion_button` is a boolean prop that renders the toggle-all icon in the top left header cell for complex datasets with empty `children` arrays and advanced querying logic explained in the preceding doc example. Your logic may require an additional query helper file to update data specifically from requerying via toggle all buttons.

In the second and third Advanced Tables in this code example, all 3 rows have empty children arrays. The second Advanced Table demonstrates that the toggle all button does not render (prior to an initial row expansion) without `persist_toggle_expansion_button` in place. The third Advanced Table shows the toggle all button due to `persist_toggle_expansion_button`.

This prop is set to `false` by default and should only be used in conjunction with `inline_row_loading`.
