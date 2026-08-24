The `form` kit provides consumers with a convenient, consistently styled `<form>` wrapper.

### Form Helpers

This kit uses rails `form_with` with our custom builder to render forms using other kits such as text_input, select, and typeahead to name a few. Doing so provides UI consistency within forms and makes adding a form to your page easier.

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

**Caveats:** dropdown needs `options` to resolve a stored id/value to an option. Typeahead with a bare database id still needs an explicit `default_options`.

