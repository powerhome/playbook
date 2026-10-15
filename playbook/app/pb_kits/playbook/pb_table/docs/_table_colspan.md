The sub-component Table elements `table_header` / `Table.Header` and `table_cell` / `Table.Cell` accept `colspan` / `colSpan` which takes a number to set how many columns that cell should span.

`colspan` / `colSpan` only applies when `tag="table"` (the default). It has no effect when `tag="div"`, since it has no equivalent in `div`-based table layouts.

For existing implementations passing `colspan` / `colSpan` through `htmlOptions`, this continues to work — the dedicated prop takes precedence if both are supplied.