Use `pb_form_with` to build Rails forms with Playbook kits. It wraps Rails [`form_with`](https://guides.rubyonrails.org/form_helpers.html) and supplies a custom form builder so fields like text inputs, selects, and typeaheads render with consistent Playbook styling and behavior.

Pick an input below to see Defaults, Validation, Default Values, Model Values + Errors, and Multi-Column layout patterns one field at a time.

### Model values and errors (edit forms)

When the form is bound to a model (`model:` / `options: { model: ... }`), builder fields read the attribute and its validation errors automatically — similar to Rails `text_field`. You usually do not need to pass `default_date`, `value`, `default_value`, or `error` yourself:

```erb
<%= form.date_picker :starts_at, props: { label: true } %>
```

On edit, `starts_at` is pre-populated and any `errors.full_messages_for(:starts_at)` message is shown. Explicit props still win when you pass them.

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

**Caveats:** dropdown needs `options` to resolve a stored id/value to an option hash; unmatched ids are ignored (not passed through). Typeahead with a bare database id still needs an explicit `default_options`.
