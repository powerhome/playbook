import React from 'react'
import { isEmpty } from 'lodash'

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

import CurrentFilters, { FilterDescription } from './CurrentFilters'
import FilterBackground, { FilterBackgroundProps } from './FilterBackground'
import FiltersPopover from './FiltersPopover'
import FiltersInline from './FiltersInline'
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
  variant?: "popover" | "inline",
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
  inlineProps,
  variant,
  ...bgProps
}: FilterSingleProps): React.ReactElement => {
  if ( variant == "inline") {
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
          <FlexItem
              grow
          >
            { children &&
              <>
                <FiltersInline
                    inlineProps={inlineProps}
                >
                  {children}
                </FiltersInline>
              </>
            }
          </FlexItem>
          <FlexItem>
            <ResultsCount
                dark={dark}
                results={results}
            />
          </FlexItem>
          <FlexItem>
            { !isEmpty(sortOptions) &&
                <SortMenu
                    dark={dark}
                    onChange={onSortChange}
                    options={sortOptions}
                    value={sortValue}
                />
            }
          </FlexItem>
        </Flex>
      </FilterBackground>
    )
  }
  else {
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
}

export default FilterSingle
