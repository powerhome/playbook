When linked DatePickers use `enable_time` / `enableTime`, QuickPick presets that do not include an explicit time apply **start of day** (12:00 AM) to the start picker and **end of day** (11:59 PM) to the end picker. That matches DatePicker minute precision and inclusive datetime filters for ranges like Today and Yesterday.

**Supported timed custom formats (Rails and React — same contract):**

| Format | Example | Semantics |
|--------|---------|-----------|
| US `m/d/Y` + time (optional `:SS`, optional `AM`/`PM`) | `"06/01/2022 9:30 AM"` | Wall-clock — literal hour/minute/second labels |
| Offset-less ISO datetime (`T` separator) | `"2026-03-08T02:30:00"` | Wall-clock — same as above (not server-TZ) |
| ISO-8601 with `Z` or numeric offset | `"2026-03-08T07:30:00Z"`, `"2026-03-08T02:30:00-05:00"` | Absolute instant |

**Emit (Rails and React — same contract):**

| Input kind | Emit |
|------------|------|
| Wall-clock (US `m/d/Y` + time, or offset-less `YYYY-MM-DDTHH:MM:SS`) | Offset-less `YYYY-MM-DDTHH:MM:SS` — authored clock face |
| Absolute (`Z` or numeric offset) | Keeps offset / `Z` (e.g. `…Z` or `…±HH:MM`) so `parseQuickPickDateTime` / `new Date(iso)` preserve the same instant |

React also accepts `Date` objects (times kept as authored, including intentional midnight / `23:59:00`).

Date-only custom strings (e.g. `"06/01/2022"`) still get SOD/EOD at sync when `enableTime` is on. Other free-text / undocumented timed strings are not supported.

On Rails, wall-clock customs go to the option payload as offset-less datetimes; absolute customs keep their offset so linked `enableTime` DatePickers sync to the correct instant (not a misread local wall-clock).

Alternate configuration: QuickPick + Time can also be handled by a Date-only QuickPick (Dropdown QuickPick + two DatePickers without time selection) paired with two TimePickers for start + end time selection in the same form.
