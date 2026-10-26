Use `sectionSeparator` on `paginationProps` to add section separators and spacing around pagination, matching the Table pagination/filter pattern.

- Defaults to `false`
- When `true`, top pagination is sandwiched by separators, bottom pagination gets a leading separator, and both use Table filter spacing (`marginLeft="lg"`, `paddingY="xs"`)
- Recommended with `tableProps.container` set to `false` inside a Card (often with a Filter above), as shown here
