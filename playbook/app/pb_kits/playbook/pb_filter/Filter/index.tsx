import React from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean,
      variant?: "popover" | "inline"
    })

const Filter = ({
  double = false,
  variant = "popover",
  ...templateProps
  }: FilterProps): React.ReactElement => {
  const displayFilter = () => {
    if (double === true) {
      return (
        <FilterDouble
            variant={variant}
            {...templateProps}
        />
      )
    } else {
      return (
        <FilterSingle
            variant={variant}
            {...templateProps}
        />
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
