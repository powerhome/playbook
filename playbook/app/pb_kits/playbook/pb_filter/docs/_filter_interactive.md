Click an applied filter chip to open an inline editor. Three types are supported via `interactiveFilters`:

- `type: 'select'` / `'dropdown'`: pick from an options list.
- `type: 'date-picker'`: inline calendar. Supports `format`, `minDate`, `maxDate`, and `mode`.

Each entry must have a matching name in `filters`. On the Rails side, pass `interactive_filters:` with `{ name:, type:, options:, target_input: }` hashes; `target_input` should point to a form field ID so selecting a chip value keeps the filter form in sync.
