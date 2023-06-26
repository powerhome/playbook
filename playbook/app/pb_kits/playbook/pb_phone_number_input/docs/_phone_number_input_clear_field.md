To clear a number inside the input element, create a `ref` inside your parent component, pass it to the kit's `ref` prop, and use `ref.current.clearField()`.

`clearField()` is a custom function inside the kit to clear numbers and the error message while still providing validation.
