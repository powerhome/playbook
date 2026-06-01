Click an applied filter chip to open an inline editor. Three types are supported via `interactive_filters`:

- `type: 'select'` / `'dropdown'`: pick from an options list.
- `type: 'date-picker'`: inline calendar. Supports `format`, `min_date`, `max_date`, and `mode`.

Each entry requires a `target_input` matching a field inside the filter form. For `select` and `date-picker`, use the input's `id`. For `dropdown`, use the dropdown kit's `id` and give each option an `id` (usually the same as `value`).

Inline chip edits update the linked control in the filter popover only (draft state). **Applied chip labels stay as-is until the filter form is submitted** (e.g. Apply), at which point the page re-renders with new `filters` values.

To skip Apply and submit immediately when a chip value is picked, add `auto_submit: true` to the entry. This calls `requestSubmit()` on the nearest `<form>` ancestor of the target input.
