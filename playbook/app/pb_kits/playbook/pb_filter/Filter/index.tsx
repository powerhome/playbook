import React from 'react'
import classnames from 'classnames'

import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'
import FilterResponsive from './FilterResponsive'
import FilterSidebar, { FilterSidebarProps } from './FilterSidebar'
import FilterSection from './FilterSection'

type FilterProps =
  | (FilterSingleProps & {
      double?: boolean,
      responsive?: 'stacked',
    })
  | (FilterDoubleProps & {
      double?: boolean,
      responsive?: 'stacked',
    })
  | (FilterSidebarProps & {
    variant?: null | 'sidebar',
  })

const Filter = ({
  double = false,
  responsive,
  variant,
  ...templateProps
  }: FilterProps): React.ReactElement => {
  const { children, className, ...layoutProps } = templateProps
  // Match Rails: stacked only for default/single (has filter children).
  // Sort-only (no children) stays on FilterSingle.
  const useResponsiveStacked = responsive === 'stacked' && Boolean(children)
  const mergedClassName = classnames(
    useResponsiveStacked && 'pb_filter_responsive',
    className,
  )

  const displayFilter = () => {
    if (variant === 'sidebar') {
      return (
        <FilterSidebar
            className={className}
            {...layoutProps}
        >
          {children}
        </FilterSidebar>
      )
    }
    if (useResponsiveStacked) {
      return (
        <FilterResponsive
            {...layoutProps}
            className={mergedClassName}
        >
          {children}
        </FilterResponsive>
      )
    }
    if (double === true) {
      return (
        <FilterDouble
            {...layoutProps}
            className={className}
        >
          {children}
        </FilterDouble>
      )
    }
    return (
      <FilterSingle
          {...layoutProps}
          className={className}
      >
        {children}
      </FilterSingle>
    )
  }

  return (
    <>
      {displayFilter()}
    </>
  )
}

Filter.Section = FilterSection

export default Filter
