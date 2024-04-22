**NOTE**: If using `expandedControl` the dev is expected to manage the row level expansion state themselves, the kit itself will NOT do it by default.

`expandedControl` is an optional prop that can be used to gain greater control over the expansion state of the Advanced Table. Tanstack handles expansion itself, however it does provide for a way to handle the state manually if needed. Usecases for this include needing to store the expansion state so it persists on page reload, set an initial expansion state, etc. 

In this example we are showing that if initial expansion state is set, it will render the table expanded according to that state. 

The expanded state must be an object with key/value pairs where the key is the row id and the value is a boolean, true or false. Tanstack by default assigns row ids based on index and depth of the row as can be seen in this example. For more information on row ids, see [here](https://tanstack.com/table/v8/docs/api/core/row#id).

### Single Row Expansion

By default, the click event on the row level toggleExpansion icon simply toggles the immediate sub rows open or closed. If you want to attach further logic to that button, the optional `onRowToggleClick` prop can be used. This click event provides one argument that can be hooked into: the current `row` object. Any additional functionality provided through this onClick will be applied in addition to the default.

###  Multi-Row Expansion

Similar to the row level click event, the default of the click event on the toggleExpansion buttons that render in the first column header (and the subRow Header rows if prop enabled) toggles all top level rows open and closed. If you want to attach further logic to that button, the optional `onToggleExpansionClick` prop can be used. This click event provides one argument that can be hooked into: the current `row` object. Any additional functionality provided through this onClick will be applied in addition to the default.

### ToggleExpansionIcon

`ToggleExpansionIcon` is another optional prop that can be used to customize the icon for the toggleExpansion button. This prop takes a string value with the default set to `arrows-from-line`. All strings must be valid FA icons.

