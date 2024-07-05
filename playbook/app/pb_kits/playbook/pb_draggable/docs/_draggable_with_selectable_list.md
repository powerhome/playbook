For a simplified version of the Draggable API for the SelectableList kit, you can do the following:

Use `DraggableProvider` and manage state as shown.

The SelectableList kit is optimized to work with the draggable kit. To enable drag, use the `enableDrag` prop on SelectableList kit AND `dragId` prop on SelectableList.Item. An additional optional boolean prop (set to true by default) of `dragHandle` is also available on SelectableList kit to show the drag handle icon.