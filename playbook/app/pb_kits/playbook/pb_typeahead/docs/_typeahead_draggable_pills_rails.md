Use `enable_pill_reorder: true` with `show_pill_index: true` to let users drag selected pills into a new order. Set `pill_drag_handle: false` to move the grip icon inside the pill and drag the whole pill instead.

While dragging, a ghost of the pill follows the pointer and a blue line marks where it will land. Order is committed on drop.

The `pb-typeahead-kit-{id}-result-option-reorder` custom event receives the reordered value array.

Keyboard reorder: focus a pill, then press ArrowLeft or ArrowRight to move it one position.
