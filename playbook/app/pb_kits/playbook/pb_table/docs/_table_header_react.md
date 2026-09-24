The `Table.Header` subcomponent creates `<th>` elements and optionally accepts:

* `colSpan` (number) for setting column span
* `sortMenu` accepts sort options as an array of `item` objects.
presence of `sortMenu` enables the sort link within the header
* `sortDropdown` (boolean) optionally declares that (true) clicking a header's sort link opens a dropdown of sort options, or (false) each sort link click cycles through available sort menu items in the order they are passed
  * passing a valid `colSpan` will render sort options within a dropdown by default, without requiring `sortDropdown` explicitly. Alternatively, the default sort dropdown can be prevented on headers with `colSpan` by setting `sortDropdown` to `false`, which reverts the column to sorting to multi-click default (each click of the sort link cycles through the available sort menu items in the order they are passed)
* `id` (string) is required for headers that have a dropdown (for popover reference); otherwise they are optional

</br>
<div class="pb_pill_kit_warning"><div class="pb_title_kit_size_4 pb_pill_text">Disclaimer</div></div>

`Table.Header` only renders the sort UI from your `sortMenu` items (`item`, `link`, `active`, `direction`). Sorting data and keeping `active` in sync is owned by your app.

This example keeps sort in React state so clicks update instantly without a page navigation. It also syncs `?sort=` into the URL with `history.replaceState` so hard links and refresh still work. In your app you can skip the URL sync and use local state only, or wire `link` values to your router. Replace the demo sort method with your own client-side or server-side sorting.
