/* @flow */

import React from 'react'
import { isEmpty } from 'lodash'
import { Flex } from '../../'

import CurrentFilters, { FilterDescription } from './CurrentFilters'
import FilterBackground, { FilterBackgroundProps } from './FilterBackground'
import FiltersPopover from './FiltersPopover'
import ResultsCount from './ResultsCount'
import SortMenu, { SortingChangeCallback, SortOptions, SortValue } from './SortMenu'

export type FilterSingleProps = {
  children?: Node,
  filters?: FilterDescription,
  onSortChange?: SortingChangeCallback,
  results?: number,
  sortOptions?: SortOptions,
  sortValue?: SortValue,
} & FilterBackgroundProps

const FilterSingle = ({ onSortChange, sortOptions, sortValue, filters, results, children, ...bgProps }: FilterSingleProps) => (
  <FilterBackground {...bgProps}>
    <Flex
        orientation="row"
        vertical="center"
    >
      <If condition={children}>
        <FiltersPopover>
          {children}
        </FiltersPopover>
        <CurrentFilters filters={filters} />
      </If>
      <ResultsCount results={results} />
      <If condition={!isEmpty(sortOptions)}>
        <SortMenu
            onChange={onSortChange}
            options={sortOptions}
            value={sortValue}
        />
      </If>
    </Flex>
  </FilterBackground>
)

export default FilterSingle
