Use the `pinnedRows` prop to pin specific rows to the top of an Advanced Table. Pinned rows will remain at the top when scrolling through table data and reorganizing via sorting.

**NOTE:** This prop is in Beta. Current Requirements for V1:
- Sticky header required: Pinned rows must be used with `sticky: true` via `tableProps` (works with both responsive and non-responsive tables)
- Row ids required: Pass an array of row ids to the `top` property. For expandable rows, both parent and all its child row ids must be included individually