Use `enable_pill_reorder: true` with `show_pill_index: true` to let users drag selected pills into a new order. By default, each pill shows a grip icon and can be dragged from anywhere on the pill. Set `pill_drag_handle: true` to use an external grip handle instead.

While dragging, pills stay in place, a ghost follows the pointer, and a blue line marks where the pill will land. Order is committed on drop.

The `pb-typeahead-kit-{id}-result-option-reorder` custom event receives the reordered value array.

Keyboard reorder: focus a pill, then press ArrowLeft or ArrowRight to move it one position.
