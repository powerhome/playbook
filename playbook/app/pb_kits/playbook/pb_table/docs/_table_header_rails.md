The `table_header` subcomponent creates `<th>` elements and optionally accepts:

* `colspan` (number) for setting column span
* `sort_menu` accepts sort options as an array of `item` objects.
presence of `sort_menu` enables the sort link within the header
* `sort_dropdown` (boolean) optionally declares that (true) clicking a header's sort link opens a dropdown of sort options, or (false) each sort link click cycles through available sort menu items in the order they are passed
  * passing a valid `colspan` will render sort options within a dropdown by default, without requiring `sort_dropdown` explicitly. Alternatively, the default sort dropdown can be prevented on headers with `colspan` by setting `sort_dropdown` to `false`, which reverts the column to sorting to multi-click default (each click of the sort link cycles through the available sort menu items in the order they are passed)
* `id` (string) is required for headers that have a dropdown (for popover reference); otherwise they are optional

</br>
<div class="pb_pill_kit_warning"><div class="pb_title_kit_size_4 pb_pill_text">Disclaimer</div></div>

`table_header` only renders the sort UI from your `sort_menu` items (`item`, `link`, `active`, `direction`). Sorting data and keeping `active` in sync is owned by your app.

This example stores sort state in the URL via `params["sort"]` so hard links and refresh keep the same order. Replace the demo sort method with your own (for example ActiveRecord `order` or a custom sorter).
