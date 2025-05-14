import React from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'
import FilterSidebar, { FilterSidebarProps } from './FilterSidebar'

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean,
    })
  | (FilterSidebarProps & {
    sidebar?: boolean,
  })

const Filter = ({
  double = false,
  sidebar = false,
  ...templateProps
  }: FilterProps): React.ReactElement => {
  const displayFilter = () => {
    if (sidebar === true) {
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

export default Filter
