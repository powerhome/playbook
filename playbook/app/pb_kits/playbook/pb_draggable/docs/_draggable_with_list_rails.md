For a simplified version of the Draggable API for the List kit, you can do the following:

The List kit is optimized to work with the draggable kit. To enable drag, use the `enable_drag` prop on List kit with an array of the included items AND `drag_id` prop on ListItems. You will also need to include the `items` prop containing your array of listed items for the Draggable API.

An additional optional boolean prop (set to true by default) of `drag_handle` is also available on ListItem kit to show the drag handle icon.

On touch devices, drag from the grip handle (no long press). Swiping the rest of the row scrolls as usual. Keep `drag_handle` enabled on mobile. Desktop mouse drag is unchanged.
