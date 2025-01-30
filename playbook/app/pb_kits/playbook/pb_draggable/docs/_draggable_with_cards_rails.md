For a simplified version of the Draggable API for the Card kit, you can do the following:

Use the `draggable` kit and manage state as shown.

`draggable/draggable_container` kit creates the container within which the cards can be dragged and dropped.

The Card kit is optimized to work with the draggable kit. To enable drag, use the `draggable_item` and `drag_id` props on the Card kit as shown. An additional optional boolean prop (set to true by default) of `drag_handle` is also available to show the drag handle icon.
