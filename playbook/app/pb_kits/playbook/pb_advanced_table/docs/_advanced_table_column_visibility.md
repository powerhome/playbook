The `columnVisibilityControl` prop allows users to toggle the visibility of table columns dynamically.

The default can be enabled simply by passing `{ default:true }` to the prop as shown. This will render the header with the icon enabled dropdown. The dropdown contains all columns present in the Table and any can be toggled on or off via the checkboxes. 
**NOTE**: The first column will not be shown in the dropdown as an option since all the expansion logic/functionality lives there and it should always be visible. 
