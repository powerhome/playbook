Click an applied filter chip to open an inline editor. Three types are supported via `interactive_filters`:

- `type: 'select'` / `'dropdown'`: pick from an options list.
- `type: 'date-picker'`: inline calendar. Supports `format`, `min_date`, `max_date`, and `mode`.

Each entry requires a `target_input` matching a field inside the filter form. For `select` and `date-picker`, use the input's `id`. For `dropdown`, use the dropdown kit's `id` and give each option an `id` (usually the same as `value`).

Chip inline edits update the linked control in the filter popover (draft). Click **Apply** on the filter form to submit; your view should read the submitted params and pass new values into `filters` so chips re-render.

To preserve space for results and sort controls, only the first four applied filters are interactive at `lg` screen sizes (`960px`) and larger. Below `960px`, applied filters render as static chips; edit values from the filter popover instead.

Optional `auto_submit: true` on a chip entry submits the form immediately when a chip value is picked.
