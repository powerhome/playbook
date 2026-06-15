Click an applied filter chip to edit it inline. `interactiveFilters` supports:

- `type: 'select'` / `'dropdown'`: pick from a list of options.
- `type: 'date-picker'`: inline calendar. Supports `format`, `minDate`, `maxDate`, and `mode`.

For date ranges, use `type: 'dropdown'` with `variant: 'quickpick'`. The Filter kit generates the same quickpick options as Dropdown, so no `options` are needed. Values are quickpick ids, such as `quickpick-this-week`.

Keep `filters`, `interactiveFilters.value`, and the filter popover fields backed by the same state so chip labels and form controls stay in sync.

On Rails, pass `interactive_filters` with `target_input` so chip picks update the linked form control. Re-read submitted params in your view after Apply so `filters` reflects the new values.
