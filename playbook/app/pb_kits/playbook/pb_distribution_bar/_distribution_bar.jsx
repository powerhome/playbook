/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

type DistributionBarProps = {
  className?: string,
  colors: array,
  data?: string,
  id?: string,
  size?: "lg" | "sm",
  widths?: array<number>,
}

const normalizeCharacters = (widths) => {
  return widths.map((width) => {
    return parseInt(width.toString().replace(/[^0-9.]/gi, ''))
  })
}

const barValues = (normalizedValues, colors) => {
  const arrSum = (value) => value.reduce((a, b) => a + b, 0)
  const widthSum = arrSum(normalizedValues)
  return normalizedValues.map((value, i) => {
    return (
      <div
          className={classnames('pb_distribution_width', colors[i] ? `color_${colors[i]}` : '')}
          key={i}
          style={{ width: `${(value * 100) / widthSum}%` }}
      />
    )
  })
}

const DistributionBar = (props: DistributionBarProps) => {
  const {
    size = 'lg',
    widths = [1],
    colors = [],
  } = props
  const normalizedValues = normalizeCharacters(widths)

  return (
    <div className={classnames(`pb_distribution_bar_${size}`, globalProps(props))}>
      {barValues(normalizedValues, colors)}
    </div>
  )
}

export default DistributionBar
