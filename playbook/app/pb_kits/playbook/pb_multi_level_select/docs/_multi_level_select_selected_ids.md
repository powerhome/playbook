`selected_ids` is an optional prop that accepts an array of ids that, if present, will mark the corresponding nodes on the treeData as checked on page load. 

Items that include `checked:true` on the treeData itself will also be selected on page load, even without being passed to `selectedIds`.

When an item is marked as checked on page load by any means, the dropdown will expand to show the checked items for easier accessibility. 

When using `selected_ids` and `variant: "single"` together (see [single select doc examples](https://playbook.powerapp.cloud/kits/multi_level_select#single-select)), the `selected_ids` array should contain only one id, because only one item can be selected and displayed at a time. If the `selected_ids` array has multiple ids in it, the first id in the array will be the treeData node checked upon page load.