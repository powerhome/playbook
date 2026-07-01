Create a sticky header that works for responsive Advanced Tables by setting `sticky: true` via `tableProps` and giving the AdvancedTable a `maxHeight` using our [Max Height](https://playbook.powerapp.cloud/global_props/max_height) global prop. 

**NOTE**: This behavior requires a `maxHeight` to work. The header is sticky within the table container, allowing for it to work along with the first column stickiness of a responsive table on smaller screen sizes.

Expand the table above to see this in action.

A sticky header on a nonresponsive table is demonstrated in the ["Sticky Header"](https://playbook.powerapp.cloud/kits/advanced_table/react#sticky-header) doc example above.