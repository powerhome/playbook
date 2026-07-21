The `column_styling` prop is an optional item that can be used within `column_definitions` as shown in the code snippet below.  It is an object that has several optional key/value pairs, this doc example highlights the following:

1) `header_alignment`: This will allow you to control alignment of header content which is set to right aligned by default. you can set this to `left`, `right` or `center`.
2) `cell_alignment`: This will allow you to control alignment of content within all cells in the given column. This is set to right aligned by default. you can set this to `left`, `right` or `center`.
3) `font_color`: This will allow you to control the font color for a given column.
4) Column width: optional keys on `column_styling` are `min_width`, `width`, and `max_width` (numbers = pixels; CSS strings allowed). This example sets `width` on Year for a fixed hierarchy column (see the width doc for `min_width` and bands).

Fixed width: pass `width` only and Playbook sets min and max to the same value automatically — you do not need all three for an exact width.

See [Column Styling: Width](https://playbook.powerapp.cloud/kits/advanced_table/styling/rails#column-styling-width) for the full guide (floor-only vs bands, and when to use one vs three values).

`column_styling` can be used within the column_definition of all the columns or some of them, as shown. Each column has its own individual control in this way.
