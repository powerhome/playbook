We provide a `usePBCopy` hook that you can import to your project. This hook will return a function that you can call to copy the text to the clipboard.

`usePBCopy({ from: 'your_id' })` will grab the `innerText` from `your_id` element, or `value` if it is an input element.
