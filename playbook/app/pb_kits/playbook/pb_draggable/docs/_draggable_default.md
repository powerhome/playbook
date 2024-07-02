The Draggable kit gives you a full subcomponent structure that allows it to be used with almost any kits.

`DraggableProvider` = This provider manages all settings that allows drag and drop to function and must be used as the outermost wrapper. It has 2 REQUIRED props: `initialItems` (initial data) and `onReorder` (function that returns mutated data as items are reordered via drag and drop). Devs must manage state as shown.
 
`Draggable.Container` = This specifies the container within which items can be dropped.
`Draggable.Item` = This specifies the items that can be dragged and dropped. `dragId` is a REQUIRED prop for Draggable.Item.