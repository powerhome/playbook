To achieve a sticky header AND sticky columns together, in addition to the `stickyLeftColumn` logic outlined above, you can:

- Set `sticky: true` via `tableProps`
- Give the AdvancedTable a `maxHeight` using our [Max Height](https://playbook.powerapp.cloud//global_props/max_height) global prop. 

**NOTE**: This behavior requires a `maxHeight` to work. The header is sticky within the table container, allowing for it to work along with the column stickiness.

Expand the table above to see this in action.