Initial results and caching apply only to `async` Dropdowns with `loadOptions`. `activeStyle={{ backgroundColor: "bg_light", fontColor: "text_lt_default" }}` is recommended so the selected row uses a light background and default text color.

- `defaultOptions={true}` calls `loadOptions("")` when enabled without opening the menu.
- `defaultOptions={options}` supplies an initial result list without making a request. Use `options` without `loadOptions` for externally managed results.
- `cacheOptions` reuses successful results for exact query strings, including empty results. Each Dropdown keeps at most 100 queries, evicting the oldest stored query. Errors are not cached, and caches are not shared between Dropdowns.

Both props default to `false`. When a search scope changes, use React's `key` to remount the scoped Dropdown, or manage results externally. Changing an inline loader function alone does not invalidate cached results.

Clearing removes displayed results and invalidates pending work, but retains cached results for subsequent searches. Emptying the query does not automatically restore the initial list.
