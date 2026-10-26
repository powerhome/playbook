Use `onInputChange` to track the current search and `renderOption` to customize each option row. Split each field by the search input, then render matching text inside `<mark>` so users can quickly see why a result matched.

This example uses `loadOptions` to search both the user's name and title.
