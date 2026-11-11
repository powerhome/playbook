`htmlType` sets the HTML `type` attribute on a `<button>` (`submit`, `reset`, or `button`). It defaults to `button`, so the button does not submit a form unless you pass `htmlType="submit"`. When `link` is set, the kit renders an `<a>` and does not emit `htmlType`.

**Deprecated:** React `type`. It does not set the HTML attribute. It only adds the class `pb_button_${type}`. The default is `inline`, which adds `pb_button_inline`. That class has no stylesheet rule; the button is already inline-flex. `type={null}` omits the class. Other strings, including older undocumented values, still add `pb_button_${type}` so existing classnames stay the same.

Use `variant` for appearance and `fullWidth` for a full-width button. `fullWidth` adds `pb_button_block` and still includes `pb_button_inline`.
