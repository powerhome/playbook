When `closeOnSelect` / `close_on_select` is set to `false`, the DatePicker remains open after a date is selected and closes when the user clicks outside it. The prop defaults to `true`.

In React, use `initializeOnce` when the change handler updates state so that rerendering does not reinitialize and close the DatePicker.
