React: Use `sticky` on a table to allow the table header to be fixed in place when the user scrolls up and down on the page.

Rails: Pass `sticky: true` to props.

If the table header is not sticking in the right place you will need to pass a inline `top` style to the `thead`.
React Example: `<thead style={{ top: "-16px" }}>`
Rails Example: `<thead style="top: -16px">`

### Troubleshooting CSS Problems
Sticky may not work if any parent/ancestor of the sticky element has any of the `overflow` properties set. Additionally, specifying a height on the overflowing container provides measurement for this feature to work properly. In some cases, it may be necessary to set the same parent/ancestor container to `position: static` as well.
