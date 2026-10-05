Use `async` with `autocomplete` or `Dropdown.Container searchbar` to search remote options. This example queries DummyJSON's public sample users API; the consuming application owns the request and result mapping.

`loadOptions(term, callback)` may call `callback(options)` or return a promise resolving to options. Map results to the existing Dropdown shape: `id`, `label`, and `value`, plus any custom fields. Remote matches are displayed without additional local label filtering. Results are matched by `value`, falling back to `id` and then `label`, so results with the same label stay distinct.

Dropdown calls the loader for nonempty queries. Keep debounce and minimum query length in the application's loader or input handler, as Nitro's existing Typeahead adapters do. No request runs on mount unless `defaultOptions={true}` is supplied.

Loading, empty, and error states are built in. Opening the Dropdown before any results are available shows the empty message. Thrown errors, rejected promises, invalid results, and requests exceeding 15 seconds show the error state. Callback loaders should invoke their callback once when complete.

New searches, clearing, dismissal, disabling, and unmounting invalidate pending results. Stale responses cannot replace the current results. Application code owns network cancellation. Async mode does not apply to Quick Pick.
