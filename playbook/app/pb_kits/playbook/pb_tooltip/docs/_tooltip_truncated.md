If your implementation involves truncated text, you can set the `truncationEnabled` prop to `true` and only display the tooltip when the trigger element is truncated.

When activated, the component checks whether the trigger element's scrollWidth is equal to its clientWidth, or if the scrollWidth is equal to 0. If either of these conditions is met, the tooltip won't be displayed because the text is not truncated.

This feature only works alongside with CSS `ellipsis` and setting a `max-width` for the trigger element. Check the CSS applied in the example above for details.