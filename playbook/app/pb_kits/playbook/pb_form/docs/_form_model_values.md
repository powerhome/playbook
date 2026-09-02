When the form is bound to a model (`model:` / `options: { model: ... }`), builder fields read attribute values and validation errors automatically — similar to Rails `text_field`. You usually do not need `default_date`, `value`, `default_value`, `selected_ids`, or `error`:

```erb
<%= form.date_picker :starts_at, props: { label: true } %>
```

This example is an edit form after a failed validation: values come from the model, and errors appear under invalid attributes. Explicit props still win when you pass them.

| Field | Auto value | Auto error |
| --- | --- | --- |
| `date_picker` | `default_date` (UTC ISO8601) | yes |
| `time_picker` | `default_time` (HH:MM) | yes |
| `dropdown_field` | `default_value` (matched via `options`) | yes |
| `star_rating_field` | `default_value` | n/a |
| `multi_level_select` | `selected_ids` (stringified) | yes |
| `phone_number_field` / `intl_telephone` | `value` | yes |
| `typeahead` | `default_options` only if already option-shaped | yes |
| text / textarea / select / `collection_select` | via Rails | yes |

**Notes**
- Dropdown needs `options` so a stored id/value can resolve to an option hash; unmatched ids are left unset.
- Typeahead only auto-binds when the attribute is `{ label, value }` (or an array of those). A bare database id still needs explicit `default_options`.
