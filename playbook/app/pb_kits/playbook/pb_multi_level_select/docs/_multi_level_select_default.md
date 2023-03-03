The MultiLevelSelect kit renders a multi leveled select dropdown based on data from the user. `treeData` is a required prop that is expected to contain the data in the form of an array of objects with this basic structure:

```
[{
  label: "label",
  value: "value",
  id: "uniqueId",
  children: [
    label: "label",
    value: "value",
    id: "uniqueId",
    children: []
  ]
}]
```

The `onSelect` prop returns an array of all checked items, irrespective of whether it is a parent, child or grandchild. Open the console on this example and check and uncheck checkboxes to see this is action!