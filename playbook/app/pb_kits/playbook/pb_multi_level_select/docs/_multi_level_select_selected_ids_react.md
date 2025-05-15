`selected_ids` is an optional prop that accepts an array of ids and controls the selected state of the tree nodes that match the values passed. When used within react-hook-form, this prop can be used to manage the selected state of any ids passed to it. 

Items that include `checked:true` on the treeData itself will also be selected on page load, even without being passed to `selectedIds`.

When an item is marked as checked on page load by any means, the dropdown will expand to show the checked items for easier accessibility.

When using `selectedIds` and `variant="single"` together (see [single select doc examples](https://playbook.powerapp.cloud/kits/multi_level_select/react#single-select)), the `selectedIds` array should contain only one id, because only one item can be selected and displayed at a time. If the `selectedIds` array has multiple ids in it, the first id in the array will be the treeData node checked upon page load.