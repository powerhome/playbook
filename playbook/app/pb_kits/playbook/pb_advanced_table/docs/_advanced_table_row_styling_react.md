The `rowStyling` prop can be used in conjunction with row ids to control certain styling options on individual rows. It is an object that has several optional key/value pairs, this doc example highlights the following:

- `backgroundColor` : use this to control the background color of the row
- `fontColor`: use this to control font color for each row if needed, for example if using a darker background color.
- `expandButtonColor`: use this to control the color of the expand icon if needed, for example if using a darker background color.

**NOTE:** Each object within the `tableData` Array must contain a unique id in order to attach an id to all Rows for this to function.
