`selected_ids` is an optional prop that accepts an array of ids and controls the selected state of the tree nodes that match the values passed. When used within react-hook-form, this prop can be used to manage the selected state of any ids passed to it. 

Items that include `checked:true` on the treeData itself will also be selected on page load, even without being passed to `selectedIds`.

When an item is marked as checked on page load by any means, the dropdown will expand to show the checked items for easier accessibility. 