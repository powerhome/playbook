`type` sets the HTML `type` attribute (`submit`, `reset`, or `button`). It does not change classes. When `type` is omitted, the attribute is omitted and a button inside a form submits by default.

There is no `html_type` prop. Pass `type` instead.

`value` is the HTML `value` attribute. The visible label is `text`, so `value` does not appear on the button. When this button submits a form and it has a `name`, the browser includes that name and value in the form data. `"1234"` in the example is only a sample value.
