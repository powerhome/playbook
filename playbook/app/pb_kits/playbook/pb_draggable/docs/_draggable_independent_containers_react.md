Use a **separate** `DraggableProvider` for each list when items should reorder within their own column only.

Each provider creates its own drag boundary. Items stay inside that list on desktop and touch — they cannot be dropped into a neighboring list.

This is different from [Dragging Across Multiple Containers](#draggable_multiple_containers), which uses **one** `DraggableProvider` with multiple `Draggable.Container` components so items can move between columns.

On touch devices, drag from the grip handle. Swiping outside the handle scrolls as usual.

