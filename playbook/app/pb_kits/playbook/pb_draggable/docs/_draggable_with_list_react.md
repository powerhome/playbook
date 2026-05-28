For a simplified version of the Draggable API for the List kit, you can do the following:

Use `DraggableProvider` and manage state as shown.

The List kit is optimized to work with the draggable kit. To enable drag, use the `enableDrag` prop on List kit AND `dragId` prop on ListItem. An additional optional boolean prop (set to true by default) of `dragHandle` is also available on ListItem to show the drag handle icon.

On touch devices, drag from the grip handle (no long press). Swiping the rest of the row scrolls as usual. Keep `dragHandle` enabled on mobile. Desktop mouse drag is unchanged.
