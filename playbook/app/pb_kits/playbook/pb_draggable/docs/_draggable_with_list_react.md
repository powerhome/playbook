For a simplified version of the Draggable API for the List kit, you can do the following:

Use `DraggableProvider` and manage state as shown.

The List kit is optimized to work with the draggable kit. To enable drag, use the `enableDrag` prop on List kit AND `dragId` prop on ListItem. An additional optional boolean prop (set to true by default) of `dragHandle` is also available on List kit to show the drag handle icon.
