When the form is bound to a model, field values and validation errors are read from the attribute automatically — no `default_date`, `value`, `default_value`, or `error` props required.

This example simulates an edit form after a failed validation: fields are pre-populated from the model, and error messages appear under the invalid attributes.

**Notes**
- Explicit props still win when you pass them.
- Dropdown needs `options` so a stored id/value can be matched to an option.
- Typeahead only auto-binds `default_options` when the attribute is already option-shaped (`{ label, value }` or an array of those). A bare database id still needs an explicit `default_options`.
