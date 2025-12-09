Set the `variant` prop to `withFilter` to render a Table with a filter. The variant automatically handles:

- Card wrapper with standard responsive margins
- Optional `title` prop to render title above the card
- Filter component rendering with Design defaults
- SectionSeparator between filter and table
- Flex layout for proper alignment

#### Required Props

- `variant="withFilter"`: Enables the filter variant
- `filterContent`: A function that receives `{ closePopover }` and returns the filter's body content (inputs, buttons, etc.). Use this to pass in all input kits, etc needed inside the Filter itself.
- `filterProps`: An object containing Filter-specific props like `results`, `sortOptions`, `sortValue`, etc.

#### Optional Props

- `title`: Displays a title above the card
- All standard Table props (`size`, `collapse`, etc.) can be used, but defaults are already set to match Design guidelines
- All standard Filter props can be used, but defaults are already set to match Design guidelines.

#### Default Filter Props

The Table kit automatically sets these Filter defaults (which you can override via `filterProps`):

- `background={false}`
- `maxHeight="50vh"`
- `minWidth="xs"`
- `popoverProps={{ width: "350px" }}`

This replaces the manual composition of Card, Flex, Title, Filter, and SectionSeparator components.