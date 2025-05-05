To use the `quickpick`:
- prop `mode` must be set to `range`
- prop `selection_type` must be set to `quickpick`

This date range variant uses hidden inputs to handle start and end dates. While they are not required props, it is advisable to specify a unique `start_date_id`, `start_date_name`, `end_date_id`, and `end_date_name` for each quick pick instance you place in a form and/or on a page.

Like all other date pickers, the quick pick does require a `picker_id`.