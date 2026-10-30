`groupSeparators` (default `false`) draws a higher-contrast `2px` stroke (`$input_border_default`) on the last visible row of each nested child group, replacing the default row border.

- When one row closes several groups at once, a single stroke insets to the outermost group it closes (its collapsible-trail); closing a year is full-bleed left
- Expanded parents defer the separator to their last visible descendant
- Root rows never get a separator; the break before the next root is the previous tree’s last child

This example defaults to **2022 → Q1 → January** open (May/Q2 collapsed) and **2023** open to its quarters, so you can see nested insets and a year-level full-bleed separator together.
