The `quickpick` variant provides predefined date based options when `variant:"quickpick"` is used. 

Open the Dropdown above to see the default options.

The quickpick variant automatically generates hidden inputs for `start_date` and `end_date` which are populated when a date range is selected. These inputs are ready for form submission.

You can customize the input names and IDs using the following props:
- `start_date_name` - The name attribute for the start date input (default: `"start_date_name"`)
- `start_date_id` - The ID attribute for the start date input (default: `"start_date_id"`)
- `end_date_name` - The name attribute for the end date input (default: `"end_date_name"`)
- `end_date_id` - The ID attribute for the end date input (default: `"end_date_id"`)

Example with custom names:
```ruby
pb_rails("dropdown", props: {
  variant: "quickpick",
  start_date_name: "filter[start_date]",
  start_date_id: "filter_start_date",
  end_date_name: "filter[end_date]",
  end_date_id: "filter_end_date"
})
```

The Dropdown kit also comes with a custom event called "pb:dropdown:selected" which updates dynamically with the selection as it changes. See code snippet to see this in action.

In addition, a data attribute called data-option-selected with the selection is also rendered on the parent dropdown div.