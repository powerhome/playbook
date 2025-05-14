import React from 'react'

import { FilterDescription } from './CurrentFilters'
import FilterBackground, { FilterBackgroundProps } from './FilterBackground'
import ResultsCount from './ResultsCount'

import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'

export type FilterSidebarProps = {
  children?: React.ReactChild[] | React.ReactChild,
  filters?: FilterDescription,
  results?: number,
} & FilterBackgroundProps

const FilterSidebar = ({
  onCollapse,
  onSortChange,
  sortOptions,
  sortValue,
  filters,
  results,
  children,
  dark,
  isCollapsed,
  maxHeight,
  minWidth,
  placement,
  popoverProps,
  ...bgProps
}: FilterSidebarProps): React.ReactElement => (
  <FilterBackground
      dark={dark}
      {...bgProps}
  >
    <Card.Body
        paddingX="sm"
        paddingY="xs"
    >
      <Flex
          align="center"
          justify="between"
          orientation="row"
      >
        <ResultsCount
            dark={dark}
            results={results}
            title
        />
        <div onClick={onCollapse}>
          <Caption
              color="link"
              cursor="pointer"
              size="xs"
              text={isCollapsed ? "Expand All" : "Collapse All"}
          />
        </div>
      </Flex>
    </Card.Body>
    <SectionSeparator dark={dark} />
    <>
      { children }
    </>
  </FilterBackground>
)

export default FilterSidebar
