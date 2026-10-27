`groupSeparators` is an optional prop that defaults to `false`. When `true`, Advanced Table draws a higher-contrast `2px` bottom border (`$input_border_default`) on the last visible row of each nested child group so multi-level drill-downs are easier to scan.

- The separator starts at the closed parent group’s label indent in the first column and continues across the remaining columns to the right edge
- Expanded parents defer the separator to their last visible descendant
- Root rows never receive a separator; the break before the next root comes from the last child of the previous root’s tree

Expand rows in this example to see separators between sibling groups (for example, after the last month of a quarter).
