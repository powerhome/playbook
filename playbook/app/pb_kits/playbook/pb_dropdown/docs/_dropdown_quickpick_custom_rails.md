The `custom_quick_pick_dates` prop allows for defining custom quick pick date options for the dropdown. The prop accepts an object with two properties: `dates` and `override`.

**The `dates` property** accepts an array of objects. Each object has `label` and `value` properties. The `label` is what will be displayed in the dropdown menu. The `value` property defines the date range that will be selected, and can be:
- An array of two date strings representing a specific range (e.g., `["06/01/2022", "06/07/2022"]`)
- An object with `time_period` and `amount` properties for dynamic date calculations:
  - The `time_period` property accepts `"days"`, `"weeks"`, `"months"`, `"quarters"`, or `"years"`, representing past time periods calculated from today.
  - The `amount` property accepts any number.

**The `override` property** is a boolean that controls whether custom dates replace or append to the default quick pick options. Default is `true` (replaces defaults). Set to `false` to append your custom dates to the default quick pick options.

