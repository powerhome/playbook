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

const DistributionBar = ({ className, data, id, size='lg', values=[1] }: DistributionBarProps) => {
  let arrSum = arr => arr.reduce((a,b) => a + b, 0)
  let valueSum = arrSum(values)
  let barValues = values.map((value,i) => {
    let valueToPercent = value*100/valueSum
    return(
      <div key={i} className={`pb_distribution_value`} style={{width:`${valueToPercent}%`}}/>
    )
  })
  return(
    <div className={`pb_distribution_bar_${size}`}>
      {barValues}
    </div>
  )
}

export default DistributionBar
