Pass `value` to control selection from React state. Use an option object or `null` for single selection, and an array of option objects for multi-selection. Dropdown emits a proposed selection through `onSelect` and the existing `onChange({ target: { name, value } })` callback; the parent must update `value` to accept it. Clear and pill removal follow the same rule. Updating `value` itself does not emit a selection callback.

Selected objects retain their custom and nested data, even when absent from the current options or remote results. `value` takes precedence over `defaultValue`. Omit `value` to retain the existing uncontrolled behavior; use `null` or `[]`, rather than `undefined`, to clear a controlled selection.

Pass `getOptionValue` to opt into stable option identity for matching, selected-row visibility, keyboard focus, and pill removal. Return a unique, stable string or number, including zero. Numeric and string versions of the same key match. Keep `label` as plain text for display, or supply `getOptionLabel` to read the label from another field without changing the original option object. Without `getOptionValue`, existing label/value matching remains unchanged.

This example distinguishes two people with the same name using their IDs. These props also work with async loading and rich option rendering; they do not change the existing callback shapes.
