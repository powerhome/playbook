Click an applied filter chip to open an inline editor. Three types are supported via `interactive_filters`:

- `type: 'select'` / `'dropdown'`: pick from an options list.
- `type: 'date-picker'`: inline calendar. Supports `format`, `min_date`, `max_date`, and `mode`.

Each entry requires a `target_input` matching the `id` of a field inside the filter form. Selecting a chip value updates that field and dispatches a `change` event.

To auto-submit the form when a chip value is picked (without an Apply button), add `auto_submit: true` to the entry. This calls `requestSubmit()` on the nearest `<form>` ancestor of the target input (compatible with both Turbo and standard form submissions).

