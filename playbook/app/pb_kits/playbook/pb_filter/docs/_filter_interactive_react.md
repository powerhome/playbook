Click an applied filter chip to open an inline editor. Three types are supported via `interactiveFilters`:

- `type: 'select'` / `'dropdown'`: pick from an options list.
- `type: 'date-picker'`: inline calendar. Supports `format`, `minDate`, `maxDate`, and `mode`.

Each entry must have a matching name in `filters` (use the stored value, not the display label — the chip resolves labels from `options`).

Keep **applied** values in `filters` / `interactiveFilters.value` (what the chips show). Keep **draft** values in the filter popover form. Wire `interactiveFilters` `onChange` handlers to update draft only. On Apply, copy draft into applied state. Chip inline edits should also update draft, not applied.

On the Rails side, pass `interactive_filters:` with `{ name:, type:, options:, target_input: }` hashes. Chip picks update the linked form field only; chips re-render after the form is submitted.
