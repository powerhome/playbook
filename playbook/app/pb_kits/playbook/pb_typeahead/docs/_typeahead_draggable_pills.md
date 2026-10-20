Use `enablePillReorder` to let users drag selected pills into a new order. Pair with `showPillIndex` to display numbered prefixes that update automatically after reorder.

By default, each pill shows a grip icon and can be dragged from anywhere on the pill. Set `pillDragHandle` to `true` to use an external grip handle instead (drag only from the handle).

While dragging, pills stay in place, a ghost follows the pointer, and a blue line marks where the pill will land. Order is committed on drop. The `onChange` callback and `pb-typeahead-kit-{id}-result-option-reorder` custom event both receive the reordered value array.

Keyboard reorder: focus a pill, then press ArrowLeft or ArrowRight to move it one position.
