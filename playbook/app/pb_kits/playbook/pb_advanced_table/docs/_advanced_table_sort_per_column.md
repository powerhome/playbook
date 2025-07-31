Sorting can now be enabled on any of the columns. To do this, add `enableSort:true` to the columnDefinition of the column you want sorting enabled on. Once enabled, clicking on the header will toggle sort between ascending and descending.

The optional `enableSortingRemoval` prop can also be used in conjunction with sorting functionality. This prop is set to 'false' by default but if set to 'true' sorting order will circle like: 'none' -> 'desc' -> 'asc' -> 'none' -> ...
It is recommended that `enableSortingRemoval` be set to 'true' when sort is enabled on mutiple columns so that sorting direction is always clear via the sort icon. 

__NOTE:__ For sort on the first column, continue to use the separate `enableSorting` prop on AdvancedTable.Header as [shown here](https://playbook.powerapp.cloud/kits/advanced_table/sorting/react#enable-sorting).
