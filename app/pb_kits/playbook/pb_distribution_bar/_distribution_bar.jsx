/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type DistributionBarProps = {
  className?: String,
  data?: String,
  id?: String,
  size?: 'lg' | 'sm',
  values?: Array<Number>,
}

const normalizeCharacters = (values) => {
  return values.map( value => {
    return parseInt(value.toString().replace(/[^0-9.]/gi, ''))
  })
}

const barValues = (normalizedValues) => {
  let arrSum = value => value.reduce((a,b) => (a + b), 0)
  let valueSum = arrSum(normalizedValues)
  return normalizedValues.map((value,i) => {
    return(
      <div
          key={i}
          className={`pb_distribution_value`}
          style={{width:`${value*100/valueSum}%`}}
      />
    )
  })
}



const DistributionBar = ({
    className,
    data,
    id,
    size='lg',
    values=[1]
  }: DistributionBarProps) => {
    const normalizedValues = normalizeCharacters(values)

    return(
      <div className={`pb_distribution_bar_${size}`}>
        {barValues(normalizedValues)}
      </div>
    )
}

export default DistributionBar
