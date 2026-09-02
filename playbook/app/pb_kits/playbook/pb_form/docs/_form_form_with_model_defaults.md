When the form is bound to a model (`model:` / `options: { model: ... }`), builder fields read the attribute and its validation errors automatically — similar to Rails `text_field`. You usually do not need to pass `default_date`, `value`, `default_value`, `selected_ids`, or `error` yourself:

```erb
<%= form.date_picker :starts_at, props: { label: true } %>
```

This example simulates an edit form after a failed validation: fields are pre-populated from the model, and error messages appear under the invalid attributes.

| Field | Auto value | Auto error |
| --- | --- | --- |
| `date_picker` | `default_date` (UTC ISO8601) | yes |
| `time_picker` | `default_time` (HH:MM) | yes |
| `dropdown_field` | `default_value` (matched via `options`) | yes |
| `star_rating_field` | `default_value` | n/a |
| `multi_level_select` | `selected_ids` | yes |
| `phone_number_field` / `intl_telephone` | `value` | yes |
| `typeahead` | `default_options` only if already option-shaped | yes |
| text / textarea / select / `collection_select` | via Rails | yes |

**Notes**
- Explicit props still win when you pass them.
- Dropdown needs `options` so a stored id/value can be matched to an option hash; unmatched ids are left unset.
- Typeahead only auto-binds `default_options` when the attribute is already option-shaped (`{ label, value }` or an array of those). A bare database id still needs an explicit `default_options`.
