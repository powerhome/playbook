The multiple container functionality also supports customized dropzone styling as shown here. 

In addition to this, the `enableCrossContainerPreview` prop can be used on the `DraggableProvider` as shown here to enable dropzone preview for cross-container dragging. 

With `enableCrossContainerPreview`, the `onDrop` and `onDragEnd` event listeners will also provide several arguments to allow developers more context from the drag event.

The `onDrop` callback is triggered when an item is successfully dropped into a container. It provides the following arguments:

- `draggedItemId` - The ID of the item that was dragged
- `droppedContainer` - The container where the item was dropped
- `originalContainer` - The container where the drag started
- `item` - The complete item object with all properties (including the updated container)
- `itemAbove` - The item directly above the dropped item in the final position (null if at the top)
- `itemBelow` - The item directly below the dropped item in the final position (null if at the bottom)

The `onDragEnd` callback is triggered when a drag operation ends, whether it was dropped or cancelled. It provides the following arguments:

- `draggedItemId` - The ID of the item that was dragged
- `finalContainer` - The container where the item ended up (could be same as original if drag was cancelled)
- `originalContainer` - The container where the drag started
- `itemAbove` - The item directly above the dragged item in the final position (null if at the top)
- `itemBelow` - The item directly below the dragged item in the final position (null if at the bottom)