The Advanced Table also allows for rendering custom components within individual Cells. To achieve this, you can make use of the optional `custom_renderer` item within each column_definitions. This function gives you access to the current Cell's value if you just want to use that with a custom Kit, but it also gives you access to the entire `row` object. The row object provides all data for the current row.

See [here](https://playbook.powerapp.cloud/kits/advanced_table/rails#column_definitions) for more indepth information on columnDefinitions are how to use them.

See [here](https://github.com/powerhome/playbook/tree/master/playbook/app/pb_kits/playbook/pb_advanced_table#readme) for the structure of the tableData used.