Toggle pills to add or remove inputs from the form. Submit to see values for the selected fields on the right. The code snippet updates to match the current selection.

The form uses `useForm({ shouldUnregister: true })`, so a field's value is dropped when its pill is turned off. Only the selected fields are submitted.
