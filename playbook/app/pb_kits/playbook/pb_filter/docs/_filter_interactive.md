Click an applied filter chip to edit it inline. `interactive_filters` supports:

- `type: 'select'` / `'dropdown'`: pick from a list of options.
- `type: 'date-picker'`: inline calendar. Supports `format`, `min_date`, `max_date`, and `mode`.

Each entry needs a `target_input` that points to the form control it updates. For `select` and `date-picker`, use the input's `id`. For `dropdown`, use the Dropdown kit's `id`.

For date ranges, use `type: 'dropdown'` with `variant: 'quickpick'`. The Filter kit generates the same quickpick options as Dropdown, so no `options` are needed. Values are quickpick ids, such as `quickpick-this-week`.

Chip edits update the linked control inside the filter popover. Click **Apply** to submit, then pass the submitted values back into `filters` so chips re-render with the latest labels.

Optional `auto_submit: true` on a chip entry submits the form immediately when a chip value is picked.
