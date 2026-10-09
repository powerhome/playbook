Use `enablePillReorder` to let users drag selected pills into a new order. Pair with `showPillIndex` to display numbered prefixes that update automatically after reorder.

Set `pillDragHandle` to `false` to move the grip icon inside the pill and drag the whole pill instead.

While dragging, a ghost of the pill follows the pointer and a blue line marks where it will land. Order is committed on drop. The `onChange` callback and `pb-typeahead-kit-{id}-result-option-reorder` custom event both receive the reordered value array.

Keyboard reorder: focus a pill, then press ArrowLeft or ArrowRight to move it one position.
