The Draggable kit allows you to choose the style of drop zones that appear when dragging an item.

By default, the Draggable kit utilizes the "ghost" style for drop zones, but you can also choose between "shadow", "outline", and "line".

Additionally, when using the "line" style, be sure to set the proper `direction` attribute within the `dropZone` prop depending on the orentation of your draggable view. By default, this attribute is set to "vertical", but can also be used with a "horizontal" direction. The `direction` attribute only applies to the "line" style and will not affect other drop zone styles.