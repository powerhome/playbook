import React from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'
import FilterSide, { FilterSideProps } from './FilterSide'

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean,
    })
  | (FilterSideProps & {
    side?: boolean,
  })

const Filter = ({
  double = false,
  side = false,
  ...templateProps
  }: FilterProps): React.ReactElement => {
  const displayFilter = () => {
    if (side === true) {
      return (
        <FilterSide {...templateProps} />
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
