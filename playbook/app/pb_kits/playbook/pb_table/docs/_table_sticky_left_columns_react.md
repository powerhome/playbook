The `stickyLeftColumn` prop expects an array of the column ids you want to be sticky. Make sure to add the corresponding `data-sticky-id` to the `<th>` and `<td>`.

If you are using the sub-component variant, then you will pass the `data-sticky-id` to `<Table.Header>` and `<Table.Cell>`

Please ensure that unique `data-sticky-id`s are used for all columns across multiple tables. Using the same columns `data-sticky-id`s on multiple tables can lead to issues when using `stickyLeftColumn` prop.