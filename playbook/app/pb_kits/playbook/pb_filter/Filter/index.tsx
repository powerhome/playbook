import React from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'
import FilterSidebar, { FilterSidebarProps } from './FilterSidebar'
import FilterSection from './FilterSection'

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean,
    })
  | (FilterSidebarProps & {
    variant?: null | 'sidebar',
  })

const Filter = ({
  double = false,
  variant,
  ...templateProps
  }: FilterProps): React.ReactElement => {
  const displayFilter = () => {
    if (variant === 'sidebar') {
      return (
        <FilterSidebar {...templateProps} />
      )
    }
    if (double === true) {
      return (
        <FilterDouble {...templateProps} />
      )
    } else {
      return (
        <FilterSingle {...templateProps} />
      )
    }
  }
  return (
    <>
      {displayFilter()}
    </>
  )
}

Filter.Section = FilterSection

export default Filter
