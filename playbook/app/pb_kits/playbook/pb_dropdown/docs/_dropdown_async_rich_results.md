Use `renderOption` to render rich content for each option. The callback receives the complete option object and returns React content. This example searches DummyJSON's public sample users and displays each user's name, job title, and department.

Dropdown retains the option wrapper, keyboard navigation, disabled behavior, and selection handling. Keep `label` as a plain-text label for the autocomplete input; selecting an option returns its original data, not its rendered content. Avoid interactive controls inside the renderer because the entire row selects the option.

The renderer works with synchronous options and async results, including `Dropdown.Container searchbar`. Explicit `Dropdown.Option` children take precedence. Returning `null` or `undefined` falls back to the standard label. This customizes menu rows; selected-value rendering is unchanged.
