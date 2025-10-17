The AdvancedTable kit accepts tree data and automatically renders expansion controls for nested subrows, to any depth, based on the data it is given. In it's simplest form, __the kit has three required props__:

### id

A unique `id` is required to allow the table functionality to work properly. Without it, certain functions like the action bar, expand/collapse caching, or selectable rows will not be able to properly reference the correct table.

You must also set `table_id` when using subcomponents like `table_header` or `table_body`.

### table_data

`table_data` accepts an array of objects as the table data. Each object is a table row, and each key:value pair within an object is a column value within that row. Nested children within a data object are automatically rendered as subrows under their parent row.

For a visual of the data structure needed for `table_data`, see [here](https://github.com/powerhome/playbook/tree/master/playbook/app/pb_kits/playbook/pb_advanced_table#readme).

### column_definitions

Column definitions are the single most important part of building a table as they are responsible for building the underlying data model that is used for all sorting, expansion, etc. `column_definitions` in the AdvancedTable kit is an array of objects as seen in the code snippet below. Each object within the array has two REQUIRED items:

- `accessor`: this is the key from your data for the value you want rendered in that column
- `label`: this is what will be rendered as the column header label

There is also one optional item that is only required if the table has nested data:

- `cellAccessors`: This is an array of strings that represent keys from your data object. This is only required for the first column in case of nested data. If you have nested data, the AdvancedTable needs to know what to render in that first column for nested items. This array represents the nested data in the order you want it rendered.