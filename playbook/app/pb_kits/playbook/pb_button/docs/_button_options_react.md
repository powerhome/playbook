`onClick` runs when the button is clicked. The example alerts.

`htmlType` sets the HTML `type` attribute on a `<button>` (`submit`, `reset`, or `button`). It defaults to `button`, so the button does not submit a form unless you pass `htmlType="submit"`. When `link` is set, the kit renders an `<a>` and does not emit `htmlType`.

`value` is the HTML `value` attribute. The visible label is `text`, so `value` does not appear on the button. When this button submits a form and it has a `name`, the browser includes that name and value in the form data. `"1234"` in the example is only a sample value.

`tabIndex` sets the HTML `tabindex`. `0` keeps the button in the normal tab order.

**Deprecated:** React `type`. It does not set the HTML attribute. It only adds the class `pb_button_${type}`. The default is `inline`, which adds `pb_button_inline`. That class has no stylesheet rule; the button is already inline-flex. `type={null}` omits the class. Other strings, including older undocumented values, still add `pb_button_${type}` so existing classnames stay the same.
