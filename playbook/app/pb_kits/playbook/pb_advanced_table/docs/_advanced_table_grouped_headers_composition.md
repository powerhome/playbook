### Grouped headers, custom UI, sort, and pinned rows

This example combines patterns that often show up together in product tables:

1. **Multi-level headers** — nested `columns` in `columnDefinitions`.
2. **Custom group header** — a `header` function returning React (here: `StarRating`, sort icon, `PbReactPopover` menu). Parent groups are not sort targets; **only leaf columns** use `enableSort: true` (see **Enable Sort By Column (Multi-Column)**).
3. **Programmatic sort** — the group `header` receives TanStack’s **`table`**. Call **`table.setSorting([{ id: "<leafColumnId>", desc: boolean }])`** using the same **`id`** values as your leaf columns. Match **direction icons** to the built-in kit (`arrow-up-arrow-down` unsorted; `arrow-up-wide-short` / `arrow-down-short-wide` when sorted).
4. **Pinned row + sticky header** — `pinnedRows` with row **`id`**s and `tableProps={{ sticky: true }}` (see **Pinned Rows**).

**Implementation notes**

- **`header` must be a child component** if you need hooks (e.g. popover open state). Render it from `header: ({ table }) => <YourHeader table={table} />`.
- **Avoid wrapping the primary control in `Tooltip`** — it can steal the first tap/click. Use a **`title`** on the button or copy in the doc instead.
- **Popover rows:** use a plain **`<button>`** as `reference`, `closeOnClick="outside"`. Picking the **same** metric again should **toggle** `desc`; switching to another leaf column often defaults to **`desc: true`** to align with **`sortDescFirst`**.
- **Data:** **`advanced_table_grouped_headers_composition_mock_data.json`** — twelve flat rows (2015–2026) with **varied** Count / Scheduled / % values so sorting is obvious; **`id` `"12"`** is **2026** and is pinned by default.

Other building blocks on this kit: **Custom Header with Multiple Headers**, **Sticky Header**.
