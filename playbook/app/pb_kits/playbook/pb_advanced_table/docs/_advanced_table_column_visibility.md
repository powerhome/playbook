The `columnVisibilityControl` prop allows users to toggle the visibility of table columns dynamically.

The default can be enabled simply by passing `{ default:true }` to the prop as shown. This will render the header with the icon enabled dropdown. The dropdown contains all columns present in the Table and any can be toggled on or off via the checkboxes.

Set `showSelectAll: true` to add a checkbox at the top of the popover. It selects every listed column that can be hidden, or deselects them when they are already all visible. The label reads **Deselect All** when every available column is visible and **Select All** otherwise. When only some of those columns are visible, the checkbox is indeterminate. The checkbox appears when `showSelectAll` is `true` and at least one listed column can be hidden.

**NOTE**: The first column will not be shown in the dropdown as an option since all the expansion logic/functionality lives there and it should always be visible. Select All does not change that column, or any column left out of the popover.
