You can use any external control (like the text itself or an icon) to copy. To use this hook, you must first add the "copy_button" kit and set the `from` prop to the copying ID. 

You must apply a unique ID to the element you are copying from. You can then attach an eventListener to the external control of your choice, pass it the ID as an argument and use `document.dispatchEvent(new CustomEvent(id))` to trigger the action. 

This will grab the `innerText` from `your_id` element, or `value` if it is an input element.

See the code example for details. 