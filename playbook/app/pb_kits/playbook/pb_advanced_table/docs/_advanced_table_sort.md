the `enableSorting` prop is a boolean prop set to false by default. If true, the table will add sort logic linked to the sort button in the header. Clicking the sort button will toggle sort between ascending and descending. Currently this sort functionality is only available on the first column.

### sortIcon

An optional prop, `sortIcon` allows you to customize your icon sets by passing it an array of any comma-separated pair of icon values. The first icon value will replace the kit's default icon when sort direction is desc, and the second value will replace the default icon when sort direction is asc. `sortIcon` also allows you to pass it a single icon as a string, in which case the icon will not toggle with the sort state. Default for this prop is `["arrow-up-wide-short", "arrow-down-short-wide"]`. All strings must be valid FA icons.
