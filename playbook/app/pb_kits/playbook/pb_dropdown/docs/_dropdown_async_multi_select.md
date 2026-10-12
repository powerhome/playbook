`multiSelect` works with `async` and `autocomplete`, or with `Dropdown.Container searchbar`. 

This example searches DummyJSON's public sample users and waits 250ms after the last keystroke before fetching. Try `Emily`, select a match, then search for `Michael`.

Each selection is added as a Form Pill and the query is cleared. The chosen row stays hidden, including when a later search returns that person again. When `defaultOptions` is set, the menu returns to that list; otherwise it shows the empty message until the next search. Removing a pill or clearing the Dropdown removes that selection. Results are matched by `value`, then `id`, then `label`, so two results with the same label stay distinct. The pills hold the selection, and the input stays empty for the next search.
