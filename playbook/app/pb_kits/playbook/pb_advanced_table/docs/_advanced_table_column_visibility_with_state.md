The `columnVisibilityControl` prop also allows for greater control over the columnVisibility state. Devs can manage state themselves by passing in `value` and `onChange` as shown.

The additional `onColumnVisibilityChange` provides a callback with the current state as the argument if needed.

`showSelectAll` uses the same controlled state. A bulk change calls `onChange` and `onColumnVisibilityChange`. Persist `value` from `onChange`. That callback receives the same updater as a single column toggle, and applying it stores each leaf column id. `onColumnVisibilityChange` reports a summary of root column ids: a group id stands in for its leaves, and the group is visible when any leaf is visible.