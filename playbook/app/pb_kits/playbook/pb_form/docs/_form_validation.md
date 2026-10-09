Toggle pills to compose a validated form. Required fields and custom messages apply to the selected inputs where supported. Submit an empty form to see error states.

For `typeahead`, `phone_number_field`, and `dropdown_field`, pass a scoped string name that matches the form scope (for example `"validation[phone]"` when `scope: :validation`) — see Defaults for details.

### Custom validation messages

All form builder fields support a custom required-field message when `validate: true` is set on the form. There are two props, depending on the field:

**Text-based inputs** (`text_field`, `email_field`, `number_field`, `search_field`, `password_field`, `url_field`, `telephone_field`, `text_area`, and `typeahead`) use `validation` with a `message` key (optional `pattern` for format checks):

```ruby
validation: { message: "Please enter a valid email address." }
```

**Selection-based and other inputs** (`select`, `collection_select`, `date_picker`, `time_picker`, `time_zone_select_field`, `dropdown_field`, `check_box`, `phone_number_field`, `intl_telephone`, `star_rating_field`, and `multi_level_select`) use `validation_message`:

```ruby
validation_message: "Please select an option."
```

`phone_number_field` and `intl_telephone` own their validation UI. `validation_message` replaces the default required empty-field copy (`"Missing phone number"`); format errors remain kit-owned.

### Required indicator

The `required_indicator` prop adds a red asterisk (*) to the input label. It works with both `label: true` for auto-generated labels and `label: "Custom Text"` for custom labels.

It is purely visual and does not enforce validation. Use it alongside `required` for HTML5 validation, or on its own when validation is handled client-side or on the backend. Support follows the underlying kit (for example Text Input, Textarea, Select, Typeahead, Phone Number Input, Date Picker, and Time Picker).
