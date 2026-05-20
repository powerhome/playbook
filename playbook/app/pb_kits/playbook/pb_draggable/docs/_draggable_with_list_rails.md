For a simplified version of the Draggable API for the List kit, you can do the following:

The List kit is optimized to work with the draggable kit. To enable drag, use the `enable_drag` prop on List kit with an array of the included items AND `drag_id` prop on ListItems. You will also need to include the `items` prop containing your array of listed items for the Draggable API.

An additional optional boolean prop (set to true by default) of `drag_handle` is also available on ListItem kit to show the drag handle icon.

On touch devices (phones and tablets), reordering is started from the grip handle only. Touch the grip and move slightly to drag; you do not need a long press. Touching and swiping the rest of the list row scrolls the page as usual. Keep `drag_handle` enabled on mobile so users have a clear drag target separate from scroll. Desktop mouse drag is unchanged.
