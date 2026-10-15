When linked DatePickers use `enable_time` / `enableTime`, QuickPick presets that do not include an explicit time apply **start of day** (12:00 AM) to the start picker and **end of day** (11:59:59 PM) to the end picker. That matches inclusive datetime filters for ranges like Today and Yesterday.

Custom QuickPick values that include an explicit time are preserved as configured:

- **React:** pass `Date` objects, or date strings with a time component (`m/d/Y` with time, offset-less wall-clock `YYYY-MM-DDTHH:MM:SS`, or ISO-8601 with `Z`/offset). `m/d/Y` + time and offset-less wall-clock are local wall-clock; ISO with `Z`/offset is an absolute instant. Intentional midnight / `23:59:59` on `Date` values are kept.
- **Rails:** include a time in each custom `value` string (e.g. `"06/01/2022 9:30 AM"`). The option payload then carries offset-less local wall-clock datetimes (`YYYY-MM-DDTHH:MM:SS`) — not timezone-absolute ISO — so sync can set Flatpickr without re-applying day bounds or shifting by server TZ. Linked hidden inputs carry the same wall-clock string. Date-only custom strings (e.g. `"06/01/2022"`) still get SOD/EOD.

Alternate configuration: QuickPick + Time can also be handled by a Date-only QuickPick (Dropdown QuickPick + two DatePickers without time selection) paired with two TimePickers for start + end time selection in the same form.
