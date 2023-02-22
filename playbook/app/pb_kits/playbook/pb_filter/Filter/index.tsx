import React from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'

type FilterProps =
  | FilterSingleProps
  | (FilterDoubleProps & {
      double?: boolean,
    })

const Filter = ({ 
  double = false,
  ...templateProps
  }: FilterProps): React.ReactElement => {
    // <Choose>
    //   <When condition={double}>
    //     <FilterDouble {...templateProps} />
    //   </When>
    //   <Otherwise>
    //     <FilterSingle {...templateProps} />
    //   </Otherwise>
    // </Choose>
  // )

  const displayFilter = () => {
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
