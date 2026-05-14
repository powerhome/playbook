Pass `interactive_filters:` with `{ name:, type:, options:, target_input: }` hashes. `target_input` should point to a form field ID so selecting a chip value keeps the filter form in sync.

Click an applied filter chip to open an inline editor. Three types are supported via `interactive_filters`:

- `type: 'select'` / `'dropdown'`: pick from an options list.
- `type: 'date-picker'`: inline calendar. Supports `format`, `min_date`, `max_date`, and `mode`.

