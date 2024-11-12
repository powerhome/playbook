The `draggable` kit gives you a full subcomponent structure that allows it to be used with almost any kits.

`initial_items` is a REQUIRED prop, which is the array of objects that contains data for the the draggable items.
 
`draggable/draggable_container` = This specifies the container within which items can be dropped.

`draggable/draggable_item` = This specifies the items that can be dragged and dropped. `drag_id` is a REQUIRED prop for draggable_item and must match the id on the items within `initial_items`.