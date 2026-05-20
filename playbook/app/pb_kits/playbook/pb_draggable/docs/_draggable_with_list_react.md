For a simplified version of the Draggable API for the List kit, you can do the following:

Use `DraggableProvider` and manage state as shown.

The List kit is optimized to work with the draggable kit. To enable drag, use the `enableDrag` prop on List kit AND `dragId` prop on ListItem. An additional optional boolean prop (set to true by default) of `dragHandle` is also available on ListItem to show the drag handle icon.

On touch devices (phones and tablets), reordering is started from the grip handle only. Touch the grip and move slightly to drag; you do not need a long press. Touching and swiping the rest of the list row scrolls the page as usual. Keep `dragHandle` enabled on mobile so users have a clear drag target separate from scroll. Desktop mouse drag is unchanged.
