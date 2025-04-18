To render sticky columns for the Advanced Table, you can use the `stickyLeftColumn` prop. This prop expects an array of the column ids you want to be sticky.

To achieve this:
- Make sure to provide an id for each column via columnDefinitions as shown below. Id can be any string. 
- One or multiple columns can be made sticky, it is recommended to set the ids within `stickyLeftColumn` in the order in which the columns are rendered.
- It is recommended to set `responsive` to none when using `stickyLeftColumn` since responsive just makes the first column sticky and the slightly different styling for `responsive` and `stickyLeftColumn` may override each other in unexpected ways.