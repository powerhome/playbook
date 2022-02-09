##### Props

*  `display_flex` | **Type**: Boolean
*  `flex` | **Type**: String | **Values**: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
*  `fixed_size` | **Type**: String | **Values**: Any CSS px or % value
*  `grow` | **Type**: Boolean
*  `shrink` | **Type**: Boolean
*   `order` | **Type**: String | **Values**: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | first

- Flex is a short hand to set the flex item to take up (x) amount of available space
- Setting Flex to 1 is equal to setting the grow & shrink prop to true
- Setting Flex to 0 is equal to setting the grow & shrink prop to false
- If grow & shrink are true, grow will take precedence an the flex item will take up as much space as possible, then if other elements are added shrink would allow other items to squish inside the flex container
- display_flex will either be true or false. If true, then the class will be applied to the kit
