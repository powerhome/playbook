The `clearable` prop controls whether the clear (X) button appears in the dropdown. When set to `false`, the clear button is hidden, which is useful when you have a separate "Reset" or "Defaults" button that handles clearing the selection.

In this example, the dropdown has `clearable={false}`, so the X button doesn't appear. Instead, a separate "Reset" button is provided that uses the dropdown's `clearSelected()` method to reset the selection.
