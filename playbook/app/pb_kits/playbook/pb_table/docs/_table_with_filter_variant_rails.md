Set the `variant` prop to `with_filter` to render a Table with a filter. The variant automatically handles:

- Card wrapper with standard responsive margins
- Optional `title` prop to render title above the card
- Filter component rendering with Design defaults
- SectionSeparator between filter and table
- Flex layout for proper alignment

#### Required Props

- `variant: "with_filter"`: Enables the filter variant
- `filter_content`: The filter's body content (inputs, buttons, etc.) built with `pb_rails` string concatenation
- `filter_props`: A hash containing Filter-specific props like `results`, `sort_menu`, etc.

#### Optional Props

- `title`: Displays a title above the card
- All standard Table props (`size`, `collapse`, etc.) can be used, but defaults are already set to match Design guidelines

#### Default Filter Props

The Table kit automatically sets these Filter defaults (which you can override via `filter_props`):

- `background: false`
- `max_height: "50vh"`
- `min_width: "xs"`
- `popover_props: { width: "350px" }`


**IMPORTANT NOTE**: 
The purpose of this variant is to provide an easy way to set up a Table with a Filter with Design standards applied by default.

If you are looking for more customization than this embedded variant provides, you may be better served by using the individual kits as demonstrating in our Table Filter Card Building Block as seen [here](https://playbook.powerapp.cloud/building_blocks/table_filter_card/rails).
