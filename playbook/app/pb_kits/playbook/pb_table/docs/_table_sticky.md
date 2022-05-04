React: Use `sticky` on a table to allow the table header to be fixed in place when the user scrolls up and down on the page.

Rails: Pass `sticky: true` to props.

If the table header is not sticking in the right place you will need to pass a inline `top` style to the `thead`.
React Example: `<thead style={{ top: "-16px" }}>`
Rails Example: `<thead style="top: -16px">`

Sticky will not work if any parent/ancestor of the sticky element has any of the `overflow` properties set. By specifying a height on the overflowing container, you should be able to make sticky work.
If the parent element has no `height` set then the sticky element won't have any area to stick to when scrolling.
