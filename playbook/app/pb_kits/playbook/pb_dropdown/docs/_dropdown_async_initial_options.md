Initial results and caching are opt-in and apply only to `async` Dropdowns with `loadOptions`.

- `defaultOptions={true}` calls `loadOptions("")` when enabled, bypassing the normal minimum length and debounce. It does not open the menu. The same loading, error, timeout, and stale-response protections apply.
- `defaultOptions={options}` seeds the initial result list without making a request. The array is an initial value, not a controlled result list; use `options` without `loadOptions` for externally managed results.
- `cacheOptions` reuses successful results for exact query strings, including empty results. Each Dropdown keeps at most 100 queries, evicting the oldest stored query. Errors are not cached. Caches are not shared between Dropdowns.
- Change `cacheKey` when the search scope changes, such as the selected department. This clears cached and displayed results and invalidates pending requests. With `defaultOptions={true}`, it also reloads the initial results. Changing the loader function identity alone does not invalidate the cache, allowing inline loaders without repeated requests.

Both `defaultOptions` and `cacheOptions` default to `false`. Clearing or resetting removes displayed results and cancels pending work, but retains cached results for subsequent searches. Typing a below-minimum query clears results; it does not automatically restore the initial list.
