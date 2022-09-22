/* @flow */

import React from 'react'

import CurrentFilters, { FilterDescription } from './CurrentFilters'
import FilterBackground, { FilterBackgroundProps } from './FilterBackground'
import FiltersPopover from './FiltersPopover'
import ResultsCount from './ResultsCount'
import SortMenu, {
  SortingChangeCallback,
  SortOptions,
  SortValue,
} from './SortMenu'

import Caption from '../../pb_caption/_caption'
import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'
export type FilterDoubleProps = {
  children: Node,
  filters?: FilterDescription,
  onSortChange: SortingChangeCallback,
  results?: number,
  sortOptions: SortOptions,
  sortValue?: SortValue,
} & FilterBackgroundProps

const FilterDouble = ({
  onSortChange,
  sortOptions,
  sortValue,
  filters,
  results,
  children,
  dark,
  minWidth,
  placement,
  ...bgProps
}: FilterDoubleProps) => (
  <FilterBackground
      dark={dark}
      {...bgProps}
  >
    <Flex
        orientation="row"
        vertical="center"
    >
      <FiltersPopover
          dark={dark}
          minWidth={minWidth}
          placement={placement}
      >
        {children}
      </FiltersPopover>
      <CurrentFilters
          dark={dark}
          filters={filters}
      />
    </Flex>
    <SectionSeparator dark={dark} />
    <Flex
        className="filter-bottom"
        orientation="row"
        spacing="between"
        vertical="center"
    >
      <ResultsCount
          dark={dark}
          results={results}
          title
      />
      <Flex
          orientation="row"
          vertical="center"
      >
        <Caption
            dark={dark}
            text="sort by:"
        />
        <SortMenu
            dark={dark}
            onChange={onSortChange}
            options={sortOptions}
            value={sortValue}
        />
      </Flex>
    </Flex>
  </FilterBackground>
)

export default FilterDouble
