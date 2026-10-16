The `custom_quick_pick_dates` prop allows for defining custom quick pick date options for the dropdown. The prop accepts an object with two properties: `dates` and `override`.

**The `dates` property** accepts an array of objects. Each object has `label` and `value` properties. The `label` is what will be displayed in the dropdown menu. The `value` property defines the date range that will be selected, and can be:
- An array of two date strings representing a specific range (e.g., `["06/01/2022", "06/07/2022"]`).
  - **Date-only** strings stay date-only on the option payload (SOD/EOD applied at sync when `enable_time`).
  - **Timed** strings use the same formats as React QuickPick customs:
    - US `m/d/Y` + time (optional `:SS`, optional `AM`/`PM`) — wall-clock (e.g. `"06/01/2022 9:30 AM"`); emit offset-less `YYYY-MM-DDTHH:MM:SS`
    - Offset-less `YYYY-MM-DDTHH:MM:SS` — wall-clock (e.g. `"2026-03-08T02:30:00"`); emit offset-less
    - ISO-8601 with `Z` or numeric offset — absolute instant; emit keeps offset/`Z` (e.g. `…+00:00` / `…-05:00`) so JS `new Date(iso)` preserves the same instant
  - Wall-clock and absolute emit differ on purpose: offset-less keeps the authored clock face; offset-bearing strings keep the absolute instant across Rails ↔ React. Unsupported timed free text raises.
- An object with `time_period` and `amount` properties for dynamic date calculations:
  - The `time_period` property accepts `"days"`, `"weeks"`, `"months"`, `"quarters"`, or `"years"`, representing past time periods calculated from today.
  - The `amount` property accepts any number.

**The `override` property** is a boolean that controls whether custom dates replace or append to the default quick pick options. Default is `true` (replaces defaults). Set to `false` to append your custom dates to the default quick pick options.
