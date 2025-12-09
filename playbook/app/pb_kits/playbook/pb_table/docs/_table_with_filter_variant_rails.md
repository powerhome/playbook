Set the `variant` prop to `with_filter` to render a Table with a filter. The variant automatically handles:

- Card wrapper with standard responsive margins
- Optional `title` prop to render title above the card
- Filter component placement
- SectionSeparator between filter and table
- Flex layout for proper alignment

#### Required Props

- `variant: "with_filter"`: Enables the filter variant
- `filter`: Pass your Filter component (use `pb_rails("filter", ...)`)

#### Optional Props

- `title`: Displays a title above the card
- All standard Table props (`size`, `collapse`, etc.) can be used, but defaults are already set to match Design guidelines.

This replaces the manual composition of Card, Flex, Title, and SectionSeparator components.
