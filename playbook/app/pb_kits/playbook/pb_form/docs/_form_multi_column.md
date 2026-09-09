Place related fields side by side with Flex and FlexItem (`grow: true`) inside `pb_form_with`. On narrower screens the row wraps so fields stack.

For a fixed-width area such as a Filter Popover, you still want Flex `gap` and usually `wrap`, but you typically do not need extra responsive flex orientation props for viewport breakpoints, because the popover width is the constraint rather than the screen size.
