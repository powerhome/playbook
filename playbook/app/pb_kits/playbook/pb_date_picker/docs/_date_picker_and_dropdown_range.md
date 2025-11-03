You can link a Dropdown (`quickpick` variant) to standard DatePickers using the following props:

**For the Dropdown**:
`controlsStartId`: ID of the DatePicker that should receive the start date.

`controlsEndId`: ID of the DatePicker that should receive the end date.

When a quickpick option like “This Year” is selected, it automatically populates the linked start and end inputs.

**For the Start/End DatePickers**:
`syncStartWith`: ID of the quickpick this start date is synced to.
`syncEndWith`: ID of the quickpick this end date is synced to.

When a user manually edits the start or end date, it clears the selected quickpick to prevent conflicting values.