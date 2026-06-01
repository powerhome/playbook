`enable_toggle_expansion` controls where AdvancedTable renders toggle-all expansion controls. It accepts `"header"`, `"all"`, or `"none"` and defaults to `"header"`.

When using the normal Rails structure, pass `enable_toggle_expansion` to `advanced_table`. The parent kit renders its own `table_header` and `table_body`, so the prop is passed down automatically.

When using the Rails subcomponent structure, pass `enable_toggle_expansion` directly to the subcomponents that need it. `advanced_table/table_header` uses it for the table header toggle-all button. **NOTE**: you must pass `table_data` to `advanced_table/table_header` as well so it can detect whether expandable rows exist. `advanced_table/table_body` uses it for nested subrow header toggle controls, such as when `subrow_headers` is present.

Use `"all"` when you want toggle-all controls in both the table header and subrow headers. Use `"header"` when you only want the table header toggle-all control. Use `"none"` to suppress the header toggle-all control.
