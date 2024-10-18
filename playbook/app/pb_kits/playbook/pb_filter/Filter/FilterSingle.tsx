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
  children?: React.ReactChild[] | React.ReactChild,
  filters?: FilterDescription,
  onSortChange?: SortingChangeCallback,
  results?: number,
  sortOptions?: SortOptions,
  sortValue?: SortValue[],
} & FilterBackgroundProps

const FilterSingle = ({
  onSortChange,
  sortOptions,
  sortValue,
  filters,
  results,
  children,
  dark,
  maxHeight,
  minWidth,
  placement,
  popoverProps,
  ...bgProps
}: FilterSingleProps): React.ReactElement => {
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
        { children && 
          <>
            <FiltersPopover
                dark={dark}
                maxHeight={maxHeight}
                minWidth={minWidth}
                placement={placement}
                popoverProps={popoverProps}
            >
            {children}
            </FiltersPopover>
            <CurrentFilters
                dark={dark}
                filters={filters}
            />
          </>
        }
        <ResultsCount
            dark={dark}
            results={results}
        />
        { !isEmpty(sortOptions) &&
            <SortMenu
                dark={dark}
                onChange={onSortChange}
                options={sortOptions}
                value={sortValue}
            />
        }
      </Flex>
    </FilterBackground>
  )
}

export default FilterSingle
