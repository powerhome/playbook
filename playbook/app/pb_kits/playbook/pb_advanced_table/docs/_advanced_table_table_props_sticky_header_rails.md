Create a sticky header that works for responsive Advanced Tables by setting `sticky: true` via `table_props` and giving the AdvancedTable a `max_height` using our [Max Height](https://playbook.powerapp.cloud/global_props/max_height) global prop. 

**NOTE**: This behavior requires a `max_height` to work. The header is sticky within the table container, allowing for it to work along with the first column stickiness of a responsive table on smaller screen sizes.

Scroll inside the table preview to see the header stick.

This example builds flat table data inline for the docs preview. For typical `table_data` setup, see [Default (Required Props)](/kits/advanced_table/default/rails#advanced_table_beta).

Expand the table above to see this in action.

A sticky header on a nonresponsive table is demonstrated in the ["Sticky Header"](https://playbook.powerapp.cloud/kits/advanced_table#sticky-header) doc example above.