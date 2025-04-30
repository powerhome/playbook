`selectable_rows` is a boolean prop that if present will add checkboxes to all rows that will allow for selecting rows. 

When a parent row is clicked, it will check all nested children rows, Children rows can be manually checked or unchecked as well. 

The data attribute `data-selected-rows` on the parent advanced table div will update dynamically with each selection to show an array of ids corresponding to the current selection. 

__NOTE__: Each object within the `table_data` Array must contain a unique id in order to attach an id to all Rows for this to function. 