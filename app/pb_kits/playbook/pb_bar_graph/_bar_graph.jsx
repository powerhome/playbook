/* @flow */

import React from 'react'

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
  new pbChart(`.${className}`, {
    axisTitle: axisTitle,
    chartData: chartData,
    id: id,
    pointStart: pointStart,
    subtitle: subTitle,
    type,
    title: title,
  })

  return (
    <div
        className={className}
        id={id}
    />
  )
}

export default BarGraph
