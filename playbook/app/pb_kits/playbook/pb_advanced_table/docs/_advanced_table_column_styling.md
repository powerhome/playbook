The `columnStyling` prop is an optional item that can be used within `columnDefinitions` as shown in the code snippet below. It is an object that has several optional key/value pairs, this doc example highlights the following:

1) `headerAlignment`: This will allow you to control alignment of header content which is set to right aligned by default. you can set this to `left`, `right` or `center`.

2) `cellAlignment`: This will allow you to control alignment of content within all cells in the given column. This is set to right aligned by default. you can set this to `left`, `right` or `center`.

3) `fontColor`: This will allow you to control the font color for a given column.

4) **Column width (layout stability)** — optional keys on `columnStyling` (numbers are treated as **pixels**; you may also use CSS length strings such as `"12rem"` or `"200px"`):

- `minWidth`: minimum width for the column’s header and body cells (helps prevent horizontal “jump” when row content or expansion depth changes on tables using fixed layout).
- `width`: preferred column width.
- `maxWidth`: maximum column width.

The live example below narrows the **Year** column (`minWidth` / `width` / `maxWidth`) so the first column stays compact while leaving room for expand and sort controls.

The same sizing can be expressed with TanStack `ColumnDef` fields on each column definition object (merged into the underlying table model): `size` (width), `minSize`, and `maxSize` (numbers, pixels). If both are present for the same axis, **`columnStyling` string values take precedence**; otherwise `columnStyling` numeric/string values override TanStack numbers when only one source sets that axis. **Grouped columns:** apply width controls on **leaf** column definitions (the columns that have an `accessor`).

`columnStyling` can be used within the columnDefinition of all the columns or some of them, as shown. Each column has its own individual control in this way. 