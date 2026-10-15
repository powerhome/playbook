When linked DatePickers use `enable_time` / `enableTime`, QuickPick presets that do not include an explicit time apply **start of day** (12:00 AM) to the start picker and **end of day** (11:59:59 PM) to the end picker. That matches inclusive datetime filters for ranges like Today and Yesterday.

Custom QuickPick values that include an explicit time are preserved as configured:

- **React:** pass `Date` objects, or date strings with a time component (ISO-8601 or `m/d/Y` with time). Intentional midnight / `23:59:59` on `Date` values are kept.
- **Rails:** include a time in each custom `value` string (e.g. `"06/01/2022 9:30 AM"` or ISO-8601). The option payload then carries ISO datetimes so sync can set Flatpickr without re-applying day bounds. Date-only custom strings (e.g. `"06/01/2022"`) still get SOD/EOD.

Alternate configuration: QuickPick + Time can also be handled by a Date-only QuickPick (Dropdown QuickPick + two DatePickers without time selection) paired with two TimePickers for start + end time selection in the same form.
