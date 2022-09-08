/* @flow */

import React from 'react'
import { isEmpty } from 'lodash'

import Flex from '../../pb_flex/_flex'

import CurrentFilters, { FilterDescription } from './CurrentFilters'
import FilterBackground, { FilterBackgroundProps } from './FilterBackground'
import FiltersPopover from './FiltersPopover'
import ResultsCount from './ResultsCount'
import SortMenu, {
  SortingChangeCallback,
  SortOptions,
  SortValue,
} from './SortMenu'

export type FilterSingleProps = {
  children?: Node,
  filters?: FilterDescription,
  onSortChange?: SortingChangeCallback,
  results?: number,
  sortOptions?: SortOptions,
  sortValue?: SortValue,
} & FilterBackgroundProps

const FilterSingle = ({
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
}: FilterSingleProps) => {
  return (
    <FilterBackground
        dark={dark}
        {...bgProps}
    >
      <Flex
          orientation="row"
          paddingRight="lg"
          vertical="center"
      >
        <If condition={children}>
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
        </If>
        <ResultsCount
            dark={dark}
            results={results}
        />
        <If condition={!isEmpty(sortOptions)}>
          <SortMenu
              dark={dark}
              onChange={onSortChange}
              options={sortOptions}
              value={sortValue}
          />
        </If>
      </Flex>
    </FilterBackground>
  )
}

export default FilterSingle
