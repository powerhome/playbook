Demonstrates listening for Time Picker custom events on the Rails enhanced element. Attach listeners to the picker root element (the element with `data-pb-time-picker`).

| Event | When it fires | `event.detail` |
| --- | --- | --- |
| `pb-time-picker-change` | Hour, minute, or period changes while the dropdown is open | `{ time: string }` — 24-hour `HH:MM` value, or `""` when cleared |
| `pb-time-picker-close` | Dropdown closes with a valid selection | `{ time: string }` — 24-hour `HH:MM` value |
