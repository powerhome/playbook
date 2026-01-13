The quickpick variant can be synced with two DatePickers for a 3-input pattern. When a quickpick option is selected from the dropdown, both DatePickers are automatically populated. When either DatePicker is manually changed, the dropdown is cleared.

#### Props for 3-Input Pattern:

- `controls_start_id` - ID of the start DatePicker to sync with
- `controls_end_id` - ID of the end DatePicker to sync with

#### DatePicker Props:

- `sync_start_with` - ID of the dropdown to clear when start date changes
- `sync_end_with` - ID of the dropdown to clear when end date changes

This pattern allows users to quickly select common date ranges or manually pick specific dates.
