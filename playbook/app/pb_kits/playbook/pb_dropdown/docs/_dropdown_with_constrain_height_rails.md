The `constrain_height` prop limits the dropdown container height to 18em and enables vertical scrolling when the content exceeds this height. This prevents long dropdown lists from rendering off-screen.

When `constrain_height` is `true`, the dropdown will:
- Have a maximum height of 18em
- Show a scrollbar when content exceeds the max height
- Prevent the dropdown from extending beyond the viewport

This is particularly useful for dropdowns with many options, such as long lists or quickpick variants with many date range options.
