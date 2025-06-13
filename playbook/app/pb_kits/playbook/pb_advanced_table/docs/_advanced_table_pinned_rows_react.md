Use the `pinnedRows` prop to pin specific rows to the top of an Advanced Table. Pinned rows will remain at the top when scrolling through table data and will not change position if sorting is used.

**NOTE:** 
- Sticky header required: Pinned rows must be used with `sticky: true` via `tableProps` (works with both responsive and non-responsive tables)
- Row ids required: Each object within the `tableData` Array must contain a unique id in order to attach an id to all Rows for this to function. 
- `pinnedRows` takes an array of row ids to the `top` property as shown in the code snippet below. 
- For expandable rows, use the parent id in `pinnedRows`, all its children will automatically be pinned with it. If id for a child is passed in without parent being pinned, nothing will be pinned. 