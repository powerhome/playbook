Click any applied filter chip with a chevron (e.g. `Territory`, `Status`, `Start date`) to open a popover containing the editor for that filter. Three editor types are supported via the `interactiveFilters` prop:

- `type: 'select'` — option list (one click → options visible → pick to apply).
- `type: 'dropdown'` — option list with `label`/`value` shape (one click → options visible → pick to apply).
- `type: 'date-picker'` — inline flatpickr calendar (same library that powers `pb_date_picker`). Supports `format`, `minDate`, `maxDate`, and `mode: 'single' | 'range' | 'multiple'`.

Each entry's key must also be present in `filters` — orphan entries are ignored at render and produce a `console.warn` in development. The popover is portaled to `document.body` so the editor surface escapes the filter row's horizontal-scroll overflow context.

Inline edits stay in sync with the full filter panel because both read/write the same `useState` hook in the parent component.
