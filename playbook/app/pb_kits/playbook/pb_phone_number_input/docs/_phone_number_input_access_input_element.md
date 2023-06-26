To access the kit's input element attributes or add event listeners, create a `ref` inside your parent component, pass it to the kit's `ref` prop, and use `ref.current.inputNode()` with your desired attribute or event listener inside a `useEffect` hook. `useEffect` is necessary because the `ref` will be initially `undefined`.

`inputNode()` is a custom function inside the kit that returns the input DOM element and its attributes. For example, to get the `name` attribute, use `ref.current.inputNode().name`
