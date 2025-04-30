`selectable_rows` can also be used with tables without nested row data. Set `enable_toggle_expansion: none` to adjust the Advanced Table styling to fit a table without subrows.

The data attribute `data-selected-rows` on the parent advanced table div will update dynamically with each selection to show an array of ids corresponding to the current selection. 

__NOTE__: Each object within the `table_data` Array must contain a unique id in order to attach an id to all Rows for this to function. 