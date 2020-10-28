Typeahead kit is data-driven. The minimum default fields are `label` and `value`.

This is an example of an option: `{ label: 'Windows', value: '#FFA500' }`

#### Rails: Default Options

You can also pass `default_options` which will populate the initial pill selections:

`default_options: [{ label: 'Windows', value: '#FFA500' }]`

#### Rails: Subscribing to JS Events
`pb-typeahead-kit-result-option-select` event to perform custom work when an option is clicked.
`pb-typeahead-kit-result-option-remove` event to perform custom work when a pill is clicked.
`pb-typeahead-kit-result-option-clear` event to perform custom work when all pills are removed upon clicking the X.
