When the form is bound to a model, field values and validation errors are read from the attribute automatically — no `default_date`, `value`, `default_value`, `selected_ids`, or `error` props required.

This example simulates an edit form after a failed validation (similar to a real wave/signup edit): fields are pre-populated from the model, and error messages appear under the invalid attributes.

Shown below: `text_field`, `email_field`, `number_field`, `text_area`, `date_picker`, `time_picker`, `select`, `collection_select`, `dropdown_field`, `star_rating_field`, `multi_level_select`, `phone_number_field`, `intl_telephone`, and `typeahead`.

**Notes**
- Explicit props still win when you pass them.
- Dropdown needs `options` so a stored id/value can be matched to an option.
- Typeahead only auto-binds `default_options` when the attribute is already option-shaped (`{ label, value }` or an array of those). A bare database id still needs an explicit `default_options`.
