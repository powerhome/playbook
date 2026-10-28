`groupSeparators` (default `false`) draws a higher-contrast `2px` stroke (`$input_border_default`) on the last visible row of each nested child group, stacked on the default row border.

- Nested closers inset to the closed parent’s collapsible-trail; year-level closers are full-bleed left
- Expanded parents defer the separator to their last visible descendant
- Root rows never get a separator; the break before the next root is the previous tree’s last child

This example defaults to **2022 → Q1 → January** open (May/Q2 collapsed) and **2023** open to its quarters, so you can see nested insets and a year-level full-bleed separator together.
