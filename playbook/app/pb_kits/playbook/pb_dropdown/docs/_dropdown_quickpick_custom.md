The `customQuickPickDates` prop allows for defining custom quick pick date options for the dropdown. The prop accepts an object with two properties: `dates` and `override`.

**The `dates` property** accepts an array of objects. Each object has `label` and `value` properties. The `label` is what will be displayed in the dropdown menu. The `value` property defines the date range that will be selected, and can be:
- An array of two date strings (or `Date` objects) representing a specific range (e.g., `["06/01/2022", "06/07/2022"]`).
  - **Date-only** strings get start-of-day / end-of-day when synced to `enableTime` DatePickers.
  - **Timed** strings use the same formats as Rails QuickPick customs:
    - US `m/d/Y` + time (optional `:SS`, optional `AM`/`PM`) — wall-clock
    - Offset-less `YYYY-MM-DDTHH:MM:SS` — wall-clock
    - ISO-8601 with `Z` or numeric offset — absolute instant
  - `Date` objects keep their authored time (including intentional midnight / `23:59:00`).
- An object with `timePeriod` and `amount` properties for dynamic date calculations:
  - The `timePeriod` property accepts `"days"`, `"weeks"`, `"months"`, `"quarters"`, or `"years"`, representing past time periods calculated from today.
  - The `amount` property accepts any number.

**The `override` property** is a boolean that controls whether custom dates replace or append to the default quick pick options. Default is `true` (replaces defaults). Set to `false` to append your custom dates to the default quick pick options.
