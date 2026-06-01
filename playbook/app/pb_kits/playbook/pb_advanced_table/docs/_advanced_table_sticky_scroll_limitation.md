`stickyLeftColumn` adds horizontal overflow to the table wrapper. Without `maxHeight`, the page scrolls vertically while the table scrolls horizontally — two scroll containers.

Sticky columns work in that setup, but the sticky header cannot stick to the page. Scroll down on the page, then scroll the first table horizontally to see the conflict.

The second table uses `maxHeight` so both axes share one scroll container. The header sticks to the top of the table box instead of the page.

For a typical implementation with subrows, see [Sticky Columns with Sticky Header](#sticky-columns-with-sticky-header).
