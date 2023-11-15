The MultiLevelSelect kit renders a multi leveled select dropdown based on data from the user. `treeData` is a required prop that is expected to contain the data in the form of an array of objects. See code snippet for an example data array.

For the React version of the kit, the `onSelect` prop returns an array of objects. This array contains all checked items irrespective of whether it is a parent, child or grandchild. Open the console on this example and check and uncheck checkboxes to see this is action!

For the Rails version of the kit, there is no onselect. The form submits as a array of strings, following the typical rails pattern of utilizing hidden inputs. The strings are the values of the selected items' ids. For example, ["103", "106", "107"].
