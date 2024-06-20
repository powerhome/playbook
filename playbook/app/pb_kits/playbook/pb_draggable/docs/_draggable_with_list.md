For a simplified version of the Draggable API for the List kit, use the DraggableProvider to wrap the List kit and use the `enableDrag` prop. 

In addition to the above `dragId` is a REQUIRED prop to be passed to the List kit when implementing dragging.

The dev must manage state as shown.

The dragHandle is added by default but this can be opted out of by setting `dragHandle` to false on the List kit.