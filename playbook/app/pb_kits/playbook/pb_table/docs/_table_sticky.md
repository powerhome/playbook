React: Use `sticky` on a table to allow the table header to be fixed in place when the user scrolls up and down on the page.

Rails: Pass `sticky: true` to props.

If the header is not sticking even after using this prop you will need to manually set the height of the `.main-page-content` class.
You can add the attribute `height: calc(100vh - 90px);` The `90px` refers to the full nav height, so that value could differ.

If the table header is not sticking in the right place you will need to pass a inline `top` style to the `thead`.
React Example: `<thead style={{ top: "-16px" }}>`
Rails Example: `<thead style="top: -16px">`
