Pass `value` to control selection from React state. Use an option object or `null` for single selection, and an array of option objects for multi-selection. Dropdown emits a proposed selection through `onSelect` and the existing `onChange({ target: { name, value } })` callback; the parent must update `value` to accept it. Clear and pill removal follow the same rule. Updating `value` itself does not emit a selection callback.

Selected objects retain their custom and nested data, even when absent from the current options or remote results. `value` takes precedence over `defaultValue`. Omit `value` to retain the existing uncontrolled behavior; use `null` or `[]`, rather than `undefined`, to clear a controlled selection.

Async options are matched by `value`, falling back to `id` and then `label`, so results with the same label stay distinct. Synchronous options keep the existing label matching.
