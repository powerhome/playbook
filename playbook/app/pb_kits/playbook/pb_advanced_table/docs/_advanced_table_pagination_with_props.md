`paginationProps` is an optional prop that can be used to further customize pagination for the AdvancedTable. This prop is an object with 2 optional items:

- `pageIndex`: An optional prop to set which page is set to open on initial load. Default is '0'
- `pageSize`: An optional prop to set total number of rows for each page before the Table paginates. Default is '10'
- `range`: The range prop determines how many pages to display in the Pagination component, See [here for more details](https://playbook.powerapp.cloud/kits/pagination/react#default). Default is set to '5'