The dialog kit also supports customizing your dialog with a [compound component](https://kentcdodds.com/blog/compound-components-with-react-hooks) structure.
This allows for greater flexibility and more complex dialogs.

For the Rails version, when using the kit as a compound component it is necessary to pass the same value as the id for the dialog, the dialog header and the dialog footer in order for the opening and closing of the dialog to function as expected.

If using the datepicker within the Rails dialog, do not use the `static_position` prop on the datepicker.