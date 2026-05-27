For a simplified version of the Draggable API for the Card kit, you can do the following:

Use `DraggableProvider` and manage state as shown.

`Draggable.Container` creates the container within which the cards can be dragged and dropped. 

The Card kit is optimized to work with the draggable kit. To enable drag, use the `draggableItem` and `dragId` props on the Card kit as shown. An additional optional boolean prop (set to true by default) of `dragHandle` is also available to show the drag handle icon.

On touch devices, drag from the grip handle (no long press). Swiping the card body scrolls as usual. Keep `dragHandle` enabled on mobile. Desktop mouse drag is unchanged.

