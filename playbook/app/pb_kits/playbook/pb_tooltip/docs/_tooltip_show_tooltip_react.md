You can build your own logic to control whether to show or not the tooltip by setting the `showTooltip` prop. The value is `true` by default.

In this example, we're verifying if one of the tooltip triggers has truncated text by comparing its `scrollWidth` to its `clientWidth`. If they're not equal, the text is not being displayed in full length and we're setting the `showTooltip` to `false`.
