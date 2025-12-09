Set the `variant` prop to `withFilter` to render a Table with a filter. The variant automatically handles:

- Card wrapper with standard responsive margins
- Optional `title` prop to render title above the card
- Filter component placement
- SectionSeparator between filter and table
- Flex layout for proper alignment

#### Required Props

- `variant="withFilter"`: Enables the filter variant
- `filter`: Pass your Filter component as a React element

#### Optional Props

- `title`: Displays a title above the card
- All standard Table props (`size`, `collapse`, etc.) can be used, but defaults are already set to match Design guidelines. 


This replaces the manual composition of Card, Flex, Title, and SectionSeparator components.