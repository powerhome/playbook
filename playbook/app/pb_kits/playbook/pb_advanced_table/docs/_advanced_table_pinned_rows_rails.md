Use the `pinned_rows` prop to pin specific rows to the top of an Advanced Table. Pinned rows will remain at the top when scrolling through table data and will not change position if sorting is used.

**NOTE:**
- Sticky header required: Pinned rows must be used with `sticky: true` via `table_props` (works with both responsive and non-responsive tables)
- Row ids required: Each object within the `table_data` array must contain a unique `id` in order to attach an id to all Rows for this to function.
- `pinned_rows` takes a hash with a `top` key containing an array of row ids, as shown in the code snippet below.
- For expandable rows, use the parent id in `pinned_rows[:top]`; all its children will automatically be pinned with it. If a child id is passed without the parent being pinned, nothing will be pinned.
