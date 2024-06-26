To use the Draggable kit, you must use the DraggableProvider and pass in `initialItems`. The `onReorder` is a function that returns the data as it changes as items are reordered. Use this to manage state as shown.

The `Draggable.Container` specifies the container within which items can be dropped.
The `Draggable.Item` specifies the items that can be dragged and dropped. `dragId` is a REQUIRED prop for Draggable.Item.