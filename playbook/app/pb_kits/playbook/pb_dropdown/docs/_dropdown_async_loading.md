Use `async` with `autocomplete` or `Dropdown.Container searchbar` to search remote options. This example queries DummyJSON's public sample users API; the consuming application owns the request and result mapping.

`loadOptions(term, callback, { signal })` may call `callback(options)` or return a promise resolving to options. Options use the existing Dropdown shape: `id`, `label`, and `value`, plus any custom fields. Remote matches are displayed without additional local label filtering.

`searchTermMinimumLength` defaults to `3`; `searchDebounceTimeout` defaults to `250` milliseconds. Set the debounce to `0` when retaining an already-debounced loader. No request runs on mount unless `defaultOptions={true}` is supplied. Loading, empty, and error messages are built in; thrown errors, rejected promises, and requests exceeding 15 seconds show the error state. Callback loaders should invoke their callback once when complete.

New searches, clearing, dismissal, disabling, and unmounting invalidate pending results. Pass the supplied `signal` to `fetch` or another abort-aware client to cancel the underlying request too. The signal is aborted on invalidation and timeout; loaders that ignore it remain protected against stale updates. Existing one- and two-argument loaders remain supported. Async mode does not apply to Quick Pick.

Use `loadingMessage`, `noOptionsMessage`, and `errorMessage` to customize or translate the async status text. Their defaults are “Loading…”, “No results found”, and “Unable to load options”. Internal state and `aria-busy` do not depend on these strings.
