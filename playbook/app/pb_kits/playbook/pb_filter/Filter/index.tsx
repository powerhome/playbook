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
  const { className, ...layoutProps } = templateProps
  const mergedClassName = classnames(
    responsive === 'stacked' && 'pb_filter_responsive',
    className,
  )

  const displayFilter = () => {
    if (variant === 'sidebar') {
      return (
        <FilterSidebar
            className={className}
            {...layoutProps}
        />
      )
    }
    if (responsive === 'stacked') {
      return (
        <FilterResponsive
            {...layoutProps}
            className={mergedClassName}
        />
      )
    }
    if (double === true) {
      return (
        <FilterDouble
            {...layoutProps}
            className={className}
        />
      )
    }
    return (
      <FilterSingle
          {...layoutProps}
          className={className}
      />
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
