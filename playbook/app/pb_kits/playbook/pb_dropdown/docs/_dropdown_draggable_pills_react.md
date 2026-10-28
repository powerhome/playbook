Use `enablePillReorder` to let users drag selected multi-select pills into a new order. Pair with `showPillIndex` to display numbered prefixes that update automatically after reorder or removal.

By default, each pill shows a grip icon and can be dragged from anywhere on the pill. Set `externalDragHandle` to `true` to use an external grip handle instead (drag only from the handle).

While dragging, pills stay in place, a ghost follows the pointer, and a blue line marks where the pill will land. Order is committed on drop. The `onChange` callback receives the reordered value array.

Keyboard reorder: focus a pill, then press ArrowLeft or ArrowRight to move it one position.

Works with Multi-Select and Multi-Select + Autocomplete.  Dropdown variants only, and is disabled by default.
