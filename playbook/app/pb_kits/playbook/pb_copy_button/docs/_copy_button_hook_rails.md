You can use any external control (like the text itself or an icon) to copy. To use this hook, you must first add the "copy_button" kit and set the `from` prop to the copying ID. This will grab the `innerText` from `your_id` element, or `value` if it is an input element. Alternatively, you can set the `value` prop and copy custom text.

You can then attach an eventListener to the external control of your choice, pass it the id (match the `from` prop) as an argument and use `document.dispatchEvent(new CustomEvent(id))` to trigger the action. 

See the code example for details. 