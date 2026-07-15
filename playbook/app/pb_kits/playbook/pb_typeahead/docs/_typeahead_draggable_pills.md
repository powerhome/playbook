Use `enablePillReorder` to let users drag selected pills into a new order. Pair with `showPillIndex` to display numbered prefixes that update automatically after reorder.

Set `pillDragHandle` to `false` to hide the grip icon and drag the whole pill instead.

Order is committed on drop. The `onChange` callback and `pb-typeahead-kit-{id}-result-option-reorder` custom event both receive the reordered value array.

Keyboard reorder: focus a pill, then press Control+Shift+ArrowLeft or Control+Shift+ArrowRight to move it one position.
