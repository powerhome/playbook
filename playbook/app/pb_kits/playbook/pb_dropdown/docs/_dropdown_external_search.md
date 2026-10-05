`onInputChange(text, { reason })` reports user typing immediately with reason `input`, and an empty query with reason `select`, `clear`, or `reset`. It is independent of the debounced `loadOptions` callback. Prop-driven selection changes do not emit input events.

Opting into `onInputChange` keeps the selected option while typing a nonempty query. Emptying a single-select autocomplete proposes an empty selection through the existing selection callbacks. Emptying a search-bar query or multi-select query preserves the selection. Explicit clear still clears the selection. Controlled `value` remains owned by the parent.

To manage requests outside Dropdown, pass `async`, `options`, and optionally `loading`, without `loadOptions`. Dropdown displays these results without local label filtering. The application owns debounce, minimum query length, errors, cancellation, and stale-response protection. The example uses an abortable DummyJSON request; failed searches clear its results. When `loadOptions` is supplied, Dropdown instead owns the result list and request lifecycle.

`resetOnFormReset` defaults to `false`. When enabled, a native form reset clears the selection and query, closes the menu, cancels Dropdown-managed searches, and emits the selection callback plus the `reset` input reason. It clears rather than restoring `defaultValue`. Prevented resets are ignored. Controlled parents must accept the proposed empty value. `ref.clearSelected()` emits the `clear` reason.

Without these new props, existing input and native form-reset behavior stays unchanged. In async mode or with `onInputChange`, the clear icon is also available for a nonempty query before an option has been selected.
