/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type DistributionBarProps = {
  className?: String,
  data?: String,
  id?: String,
  size?: 'lg' | 'sm',
  widths?: Array<Number>,
}

const normalizeCharacters = (widths) => {
  return widths.map((width) => {
    return parseInt(width.toString().replace(/[^0-9.]/gi, ''))
  })
}

const barValues = (normalizedValues) => {
  const arrSum = (value) => value.reduce((a, b) => (a + b), 0)
  const widthSum = arrSum(normalizedValues)
  return normalizedValues.map((value, i) => {
    return (
      <div
          className="pb_distribution_width"
          key={i}
          style={{ width: `${value * 100 / widthSum}%` }}
      />
    )
  })
}

const DistributionBar = ({
  size = 'lg',
  widths = [1],
}: DistributionBarProps) => {
  const normalizedValues = normalizeCharacters(widths)

  return (
    <div className={`pb_distribution_bar_${size}`}>
      {barValues(normalizedValues)}
    </div>
  )
}

export default DistributionBar
