Typeahead kit is data-driven. The minimum default fields are `label` and `value`.

This is an example of an option: `{ label: 'Windows', value: '#FFA500' }`

#### Rails: Default Options

You can also pass `default_options` which will populate the initial pill selections:

`default_options: [{ label: 'Windows', value: '#FFA500' }]`

When present, the kit root gets `data-default-value` (JSON of `{ label, value }` only) for restore-after-clear via `:set`. Extra option fields are omitted; if serialization fails, the attribute is left off so the kit still mounts.

#### Rails: Subscribing to JS Events

JavaScript events are triggered based on actions you take within the kit such as selection, removal and clearing.
This kit utilizes a default `id` prop named `react-select-input`. It is **highly advised** to send your own unique `id` prop when using this kit to ensure these events do not unintentionally affect other instances of the kit in the same view. The examples below will use the unique `id` prop named `typeahead-pills-example1`:

`pb-typeahead-kit-typeahead-pills-example1-result-option-select` event to perform custom work when an option is clicked.
`pb-typeahead-kit-typeahead-pills-example1-result-option-remove` event to perform custom work when a pill is clicked.
`pb-typeahead-kit-typeahead-pills-example1-result-option-clear` event to perform custom work when all pills are removed upon clicking the X.

#### Rails: Publishing JS Events

The same rule regarding the `id` prop applies to publishing JS events. The examples below will use the unique `id` prop named `typeahead-pills-example1`:

`pb-typeahead-kit-typeahead-pills-example1:clear` event to clear all options.

`pb-typeahead-kit-typeahead-pills-example1:set` event to set options without treating it as a user click (no `result-option-select`). Pass `detail` as `[{ label, value }, ...]` (or a single object for single-select):

```js
document.dispatchEvent(new CustomEvent('pb-typeahead-kit-typeahead-pills-example1:set', {
  detail: [{ label: 'Windows', value: '#FFA500' }]
}))
```
