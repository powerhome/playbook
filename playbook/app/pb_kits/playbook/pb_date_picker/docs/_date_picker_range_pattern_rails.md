You can link a Quickpick Dropdown to standard DatePickers using the following props:

**For the Quickpick DatePicker**:
`controls_start_id`: ID of the DatePicker that should receive the start date.

`controls_end_id`: ID of the DatePicker that should receive the end date.

When a quickpick option like “This Year” is selected, it automatically populates the linked start and end inputs.

**For the Start/End DatePickers**:
`sync_start_with`: ID of the quickpick this start date is synced to.
`sync_end_with`: ID of the quickpick this end date is synced to.

When a user manually edits the start or end date, it clears the selected quickpick to prevent conflicting values.
