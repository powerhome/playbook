Click an applied filter chip to open an inline editor. Three types are supported via `interactiveFilters`:

- `type: 'select'` / `'dropdown'`: pick from an options list.
- `type: 'date-picker'`: inline calendar. Supports `format`, `minDate`, `maxDate`, and `mode`.

Use one shared state object for `filters`, `interactiveFilters.value`, and the filter popover fields so chip picks, form edits, and chip labels stay in sync. Chip `onChange` handlers should update that same state.

To preserve space for results and sort controls, only the first four applied filters are interactive at `lg` screen sizes (`960px`) and larger. Below `960px`, applied filters render as static chips; edit values from the filter popover instead.

On Rails, pass `interactive_filters` with `target_input` so chip picks update the linked form control. Re-read submitted params in your view after Apply so `filters` reflects the new values.
