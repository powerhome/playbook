The Drawer component can be used to create responsive navigation menus and sidebars. It provides flexible options for controlling when and how the drawer appears based on screen size.

### Within Element
The `withinElement` prop allows you to render the drawer within its parent container:
- The drawer will be positioned relative to its parent element
- Useful for creating nested navigation structures
- This must be used in conjunction with the `triggerId` prop

This provides a clean way to create responsive navigation patterns that adapt to different screen sizes while maintaining a consistent user experience.

### Trigger Id
The `triggerId` prop allows you to connect an element to control the drawer:
- The specified element will toggle the drawer open/closed
- The element is automatically hidden when the drawer is opened via breakpoint
- The element reappears when the drawer is closed via breakpoint

### Breakpoint
Use the `breakpoint` prop to control when the drawer automatically opens or closes based on screen size. For example, setting `breakpoint="md"` will:
- Close the drawer on screens smaller than the medium breakpoint (992px)
- Automatically open the drawer on screens larger than or equal to the medium breakpoint




