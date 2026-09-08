To select time as well, you should pass the `enableTime` / `enable_time` boolean prop. You can also enable timezone display by passing `showTimezone` / `show_timezone`.

Use `onClose` when the calendar should stay open while the user picks both a date and a time. It fires once, after the user clicks outside to close the calendar, instead of on every selection the way `onChange` does. For React, pair the handler with `initializeOnce` so storing the value in state does not re-initialize the picker and reset the input back to `defaultDate`.
