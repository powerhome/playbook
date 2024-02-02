The AdvancedTable kit takes the table data and automatically renders expandable subrows for nested items to any depth needed. In it's simplest form, __the kit has two required props__: 

### tableData

`tableData` is the data that the kit needs to consume to render the table. This data will take the structure of an array of objects where each object will be rendered as a row with the key/value pairs being the column values. If an object within that data has children, the kit will automatically create subRows with icon buttons on the parent rows to toggle the subRows open or closed. The toggleExpansionAll button in the first column header can also be used to toggle expansion for the top level parent rows. For a visual of the data structure needed for `tableData`, see [here](https://github.com/powerhome/playbook/blob/PBNTR-177-New-Advanced-Table-Kit/playbook/app/pb_kits/playbook/pb_advanced_table/README.md).

### columnDefinitions

`columnDefinitions` maps to the columns prop on the Tanstack table. Column definitions are the single most important part of building a table as they are responsible for building the underlying data model that is used for all sorting, expansion, etc. `ColumnDefinitions` in the AdvancedTable kit is a array of objects as seen in the code snippet below. Each object within the array has two REQUIRED items:

- `accessor`: this is the key from your data for the value you want rendered in that column
- `label`: this is what will be rendered as the column header label

There is also one optional item that is only required if the table has nested data: 

- `cellAccessors`: This is an array of strings that represent keys from your data object. This is only required for the first column in case of nested data. If you have nested data, the AdvancedTable needs to know what to render in that first column for nested items. This array represents the nested data in the order you want it rendered.