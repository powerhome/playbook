Use `enable_pill_reorder: true` with `show_pill_index: true` to let users drag selected multi-select pills into a new order. By default, each pill shows a grip icon and can be dragged from anywhere on the pill. Set `external_drag_handle: true` to use an external grip handle instead (drag only from the handle).

While dragging, pills stay in place, a ghost follows the pointer, and a blue line marks where the pill will land. Order is committed on drop.

The `pb:dropdown:reordered` custom event receives the reordered value array. Submitted form values (hidden inputs) preserve the new order. `pb:dropdown:selected` also fires with the updated order.

Keyboard reorder: focus a pill, then press ArrowLeft or ArrowRight to move it one position.

Works with Multi-Select and Multi-Select + Autocomplete Dropdown variants only, and is disabled by default.
