/* @flow */

import React, { useEffect } from 'react'

import { pbChart } from '../'

type BarGraphProps = {
  axisTitle: String,
  chartData: Array<{
    name: String,
    data: Array<Number>,
  }>,
  className?: String,
  id: Number,
  pointStart: Number,
  subTitle?: String,
  title: String,
  type?: String,
}

const BarGraph = ({
  axisTitle,
  className = 'pb_bar_graph',
  chartData,
  id,
  pointStart,
  subTitle,
  title,
  type = 'column',
}: BarGraphProps) => {
  useEffect(() => {
    new pbChart(`.${className}`, {
      axisTitle,
      chartData,
      id,
      pointStart,
      subtitle: subTitle,
      type,
      title,
    })
  })

  return (
    <div
        className={className}
        id={id}
    />
  )
}

export default BarGraph
