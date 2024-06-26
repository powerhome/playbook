For a simplified version of the Draggable API for the SelectableList kit, use the DraggableProvider to wrap the SelectableList kit and use the `enableDrag` prop. 

In addition to the above, `dragId` is a REQUIRED prop to be passed to the SelectableList kit when implementing dragging.

The dev must manage state as shown.

The dragHandle is added by default but this can be opted out of by setting `dragHandle` to false on the SelectableList kit.