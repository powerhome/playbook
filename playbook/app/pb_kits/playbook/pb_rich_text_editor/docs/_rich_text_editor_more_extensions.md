This variant allows you to optionally include any of [Tiptap’s 53 extensions](https://tiptap.dev/extensions) within any advanced editor by using the `extensions` prop.

**NOTE**: In order to leverage this prop, you **must** install the extension you need in your project, import it and pass it to the extensions array as shown in this example with the HorizontalRule and the Highlight extensions.

In order to add the extension to the editor toolbar, create an array of objects (as shown in the ExtensionsList array in the example below). Each object in this array should include:

`icon`: the icon to display within the toolbar dropdown (any Fontawesome icons can be used)
`isActive`: sets the extension to active within the dropdown, when applicable
`text`: the label within the toolbar dropdown
`onclick`: initializes the extension when it’s clicked within the dropdown (snytax varies with extension, see Tiptap's docs for more information)

This array can then be passed to the `extensions` prop and all extensions in the array will be rendered in the ellipsis dropdown.
