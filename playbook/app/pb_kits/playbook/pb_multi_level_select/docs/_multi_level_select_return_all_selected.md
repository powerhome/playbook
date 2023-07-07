The `returnAllSelected` or `return_all_selected` prop can be used when users want data on all checked nodes from the dropdown, irrespective of whether it is a parent or child node. 

__NOTE__: This variant also does not automatically uncheck the parent when any of the child nodes are unchecked. `returnAllSelected` is set to false by default. 

__NOTE__: For larger trees that may return many pill selections, you can optionally set `input_display: "none"`(for Rails) or `inputDisplay = "none"`(for React) to hide all pills within the input.