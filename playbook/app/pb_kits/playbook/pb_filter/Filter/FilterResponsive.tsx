import React from 'react'
import { isEmpty } from '../../utilities/object'

import CurrentFilters, { FilterDescription, InteractiveFilters } from './CurrentFilters'
import FilterBackground, { FilterBackgroundProps } from './FilterBackground'
import FiltersPopover from './FiltersPopover'
import ResultsCount from './ResultsCount'
import SortMenu, {
  SortingChangeCallback,
  SortOptions,
  SortValue,
} from './SortMenu'

import Caption from '../../pb_caption/_caption'
import SectionSeparator from '../../pb_section_separator/_section_separator'

export type FilterResponsiveProps = {
  children?: React.ReactChild[] | React.ReactChild,
  filters?: FilterDescription,
  interactiveFilters?: InteractiveFilters,
  onSortChange?: SortingChangeCallback,
  results?: number,
  sortOptions?: SortOptions,
  sortValue?: SortValue[],
} & FilterBackgroundProps

// One tree for responsive="stacked": CSS grid (shared with Rails) toggles
// one-row vs two-row chrome without remounting across the breakpoint.
// Stacked bottom reuses `.filter-bottom` (via `.pb_filter_responsive_bottom`)
// so Results/Sort match FilterDouble sizing.
const FilterResponsive = ({
  children,
  dark,
  filters,
  interactiveFilters,
  maxHeight,
  minWidth,
  onSortChange,
  placement,
  popoverProps,
  results,
  sortOptions,
  sortValue,
  ...bgProps
}: FilterResponsiveProps): React.ReactElement => {
  const showSort = !isEmpty(sortOptions)

  return (
    <FilterBackground
        dark={dark}
        {...bgProps}
    >
      <div className="pb_filter_responsive_layout">
        <div className="pb_filter_responsive_filters">
          {children &&
            <FiltersPopover
                dark={dark}
                maxHeight={maxHeight}
                minWidth={minWidth}
                placement={placement}
                popoverProps={popoverProps}
            >
              {children}
            </FiltersPopover>
          }
          <CurrentFilters
              dark={dark}
              filters={filters}
              interactiveFilters={interactiveFilters}
          />
        </div>

        <div className="pb_filter_responsive_results_inline">
          <ResultsCount
              dark={dark}
              results={results}
          />
        </div>

        <div className="pb_filter_responsive_sep">
          <SectionSeparator dark={dark} />
        </div>

        <div className="pb_filter_responsive_bottom filter-bottom">
          <div className="pb_filter_responsive_results_bar">
            <ResultsCount
                dark={dark}
                results={results}
                title
            />
          </div>

          <div className="pb_filter_responsive_sort">
            {showSort &&
              <>
                <Caption
                    className="pb_filter_responsive_sort_label"
                    dark={dark}
                    text="sort by:"
                />
                <SortMenu
                    dark={dark}
                    onChange={onSortChange}
                    options={sortOptions}
                    value={sortValue}
                />
              </>
            }
          </div>
        </div>
      </div>
    </FilterBackground>
  )
}

export default FilterResponsive
