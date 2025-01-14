The `stickyLeftColumn` prop expects an array of the column ids you want to be sticky. Make sure to add the corresponding id to the `<th>` and `<td>`.

If you are using the sub-component variant, then you will pass the id to `<Table.Header>` and `<Table.Cell>`

Please ensure that unique ids are used for all columns across multiple tables. Using the same columns ids on multiple tables can lead to issues when using `stickyLeftColumn` prop.