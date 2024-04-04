`selected_ids` is an optional prop that accepts an array of ids that, if present, will mark the corresponding nodes on the treeData as checked on page load. 

Items that include `checked:true` on the treeData itself will also be selected on page load, even without being passed to `selectedIds`.

When an item is marked as checked on page load by any means, the dropdown will expand to show the checked items for easier accessibility. 
