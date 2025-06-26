The optional `customSort` prop can be used to add a sort button within a subrow header. The button will only appear if that subrowheader has more than one subrow nested within it. This button comes with a callback function called `onCustomSortClick`.

The `onCustomSortClick` provides as an argument an array of all the subrows nested within that level of the table. 

__NOTE__: `customSort` must be used in conjunction with the `subRowHeaders` prop. The `customSort` DOES NOT handle the sort logic, this must be handled on the frontend using the callback provided. 