Use `async` with `autocomplete` or `Dropdown.Container searchbar` to search remote options. This example queries DummyJSON's public sample users API; the consuming application owns the request and result mapping.

`loadOptions(term, callback)` may call `callback(options)` or return a promise resolving to options. Options use the existing Dropdown shape: `id`, `label`, and `value`, plus any custom fields. Remote matches are displayed without additional local label filtering.

`searchTermMinimumLength` defaults to `3`; `searchDebounceTimeout` defaults to `250` milliseconds. Set the debounce to `0` when retaining an already-debounced loader. No request runs on mount unless `defaultOptions={true}` is supplied. Loading, empty, and error messages are built in; thrown errors, rejected promises, and requests exceeding 15 seconds show the error state. Callback loaders should invoke their callback once when complete.

New searches, clearing, dismissal, disabling, and unmounting invalidate pending results. This prevents stale updates but does not abort the application's network request. Async mode does not apply to Quick Pick.
