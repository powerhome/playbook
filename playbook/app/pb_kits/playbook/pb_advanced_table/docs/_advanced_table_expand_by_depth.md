The `expandByDepth` prop enables users to expand or collapse table rows by specific levels of nesting. When provided, it renders a dropdown that appears when the toggle icon in the header is clicked.

`expandByDepth` accepts an array of objects, where each object defines the depth level to target and the label to display in the dropdown. When a user selects an option:

**Expanding a depth**: Expands all rows at the selected depth AND all parent levels above it (if parent levels were closed), ensuring nested content is visible.

**Collapsing a depth**: Only collapses rows at the selected depth, keeping parent rows expanded for context.

If you want to attach further logic to each option click, the **optional** `onExpandByDepthClick` prop can be used. This click event provides 2 arguments that can be hooked into: the depth level of the clicked item AND all flattened table rows. Any additional functionality provided through this onClick will be applied in addition to the default.

