`selectableRows` is a boolean prop that if present will add checkboxes to all rows that will allow for selecting rows. 

When a parent row is clicked, it will check all nested children rows, Children rows can be manually checked or unchecked as well. 

The `onRowSelectionChange` prop returns an array of ids of all Rows that have been selected. Open the console on this example and check and uncheck checkboxes to see this is action! __NOTE__: Each object within the `tableData`Array must contain a unique id in order to attach an id to all Rows for this to function. 