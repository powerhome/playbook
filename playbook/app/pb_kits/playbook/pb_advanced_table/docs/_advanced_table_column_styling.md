The `columnStyling` prop is an optional item that can be used within `columnDefinitions` as shown in the code snippet below. It is an object that has several optional key/value pairs, this doc example highlights the following:

1) `headerAlignment`: This will allow you to control alignment of header content which is set to right aligned by default. you can set this to `left`, `right` or `center`.

2) `cellAlignment`: This will allow you to control alignment of content within all cells in the given column. This is set to right aligned by default. you can set this to `left`, `right` or `center`.

3) `fontColor`: This will allow you to control the font color for a given column.

4) Column width: optional keys on `columnStyling` are `minWidth`, `width`, and `maxWidth` (numbers = pixels; CSS strings allowed). This example sets `minWidth` on Year so the hierarchy column does not shrink when rows expand.

Fixed width: pass `width` only (or TanStack `size` only) and Playbook sets min and max to the same value automatically — you do not need all three for an exact width.

See [Column Styling: Width](https://playbook.powerapp.cloud/kits/advanced_table/react#column-styling-width) for the full guide (Playbook ↔ TanStack mapping, floor-only vs bands, and when to use one vs three values).

`columnStyling` can be used within the columnDefinition of all the columns or some of them, as shown. Each column has its own individual control in this way. 