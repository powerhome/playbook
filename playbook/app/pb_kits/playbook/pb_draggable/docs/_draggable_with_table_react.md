The draggable kit can also be used in conjunction with the table kit to create draggable table rows. To do this:

- Wrap the Table with the `DraggableProvider` and manage state as shown. 
- use the `draggableContainer` prop on the Table.Body to designate it as the Draggable Container
- use the `draggableItem` prop on the Table.Row to designate it as the Draggable Item. Make sure to also pass id to the `dragId` prop here. 