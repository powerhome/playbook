Custom validation messages allow you to override the browser's default validation text with your own messaging. This provides a better user experience by giving specific, actionable feedback.

**Text-based inputs** (TextInput, Typeahead) use the `validation` prop with a `message` key:
```ruby
validation: { message: "Please enter a valid email address." }
```

**Selection-based inputs** (Select, DatePicker, TimePicker) use the `validation_message` prop:
```ruby
validation_message: "Please select an option."
```

When a required field is left empty or fails validation, your custom message will display instead of the generic browser default.