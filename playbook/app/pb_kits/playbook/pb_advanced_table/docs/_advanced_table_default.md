**NOTE:** The Advanced Table kit uses the [Tanstack Table v8](https://tanstack.com/table/v8/docs/introduction) under the hood to render advanced tables that allow for complex, nested data structures with expansion and sort options.
<br />
<br />
<br />

The AdvancedTable kit accepts tree data and automatically renders expansion controls for nested subrows, to any depth, based on the data it is given. In it's simplest form, __the kit has two required props__:

### tableData

`tableData` accepts an array of objects as the table data. Each object is a table row, and each key:value pair within an object is a column value within that row. Nested children within a data object are automatically rendered as subrows under their parent row. Each parent row is prepended with expansion controls for toggling its nested child rows. The `toggleExpansionAll` button in the first column header can also be used to toggle expansion of all parent rows within the table.

For a visual of the data structure needed for `tableData`, see [here](https://github.com/powerhome/playbook/tree/master/playbook/app/pb_kits/playbook/pb_advanced_table#readme).

### columnDefinitions

`columnDefinitions` maps to the columns prop on the Tanstack table. Column definitions are the single most important part of building a table as they are responsible for building the underlying data model that is used for all sorting, expansion, etc. `ColumnDefinitions` in the AdvancedTable kit is an array of objects as seen in the code snippet below. Each object within the array has two REQUIRED items:

- `accessor`: this is the key from your data for the value you want rendered in that column
- `label`: this is what will be rendered as the column header label

There is also one optional item that is only required if the table has nested data: 

- `cellAccessors`: This is an array of strings that represent keys from your data object. This is only required for the first column in case of nested data. If you have nested data, the AdvancedTable needs to know what to render in that first column for nested items. This array represents the nested data in the order you want it rendered.