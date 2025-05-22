This kit's `options` prop requires an array of objects, each of which will be used as the selectable options within the dropdown. Each option object can support any number of key-value pairs, but each MUST contain `label`, `value` and `id`. 

The kit also comes with a custom event called "pb:dropdown:selected" which updates dynamically with the selection as it changes. See code snippet to see this in action.

In addition, a data attribute called `data-option-selected` with the selection is also rendered on the parent dropdown div.