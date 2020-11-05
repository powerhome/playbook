Typeahead kit is data-driven. The minimum default fields are `label` and `value`.

This is an example of an option: `{ label: 'Windows', value: '#FFA500' }`

#### Rails: Default Options

You can also pass `default_options` which will populate the initial pill selections:

`default_options: [{ label: 'Windows', value: '#FFA500' }]`

#### Rails: Subscribing to JS Events

JavaScript events are triggered based on actions you take within the kit such as selection, removal and clearing.
This kit utilizes a default `id` prop named `react-select-input`. It is **highly advised** to send your own unique `id` prop when using this kit to ensure these events do not unintentionally affect other instances of the kit in the same view. The examples below will use the unique `id` prop named `typeahead-pills-example1`:

`pb-typeahead-kit-typeahead-pills-example1-result-option-select` event to perform custom work when an option is clicked.
`pb-typeahead-kit-typeahead-pills-example1-result-option-remove` event to perform custom work when a pill is clicked.
`pb-typeahead-kit-typeahead-pills-example1-result-option-clear` event to perform custom work when all pills are removed upon clicking the X.

#### Rails: Publishing JS Events

The same rule regarding the `id` prop applies to publishing JS events. The examples below will use the unique `id` prop named `typeahead-pills-example1`:

`pb-typeahead-kit-typeahead-pills-example1:clear` event to clear all options.