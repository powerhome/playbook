/* @flow */

import React from 'react'

import { pbChart } from '../'

type LineGraphProps = {
  axisTitle?: String,
  className?: String,
  chartData: Array<{
      name: String,
      data: Array<Number>,
  }>,
  gradient?: Boolean,
  id: String,
  pointStart: Number,
  subTitle?: String,
  title: String,
}

const LineGraph = ({
  axisTitle,
  className = 'pb_bar_graph',
  chartData,
  id,
  pointStart,
  subTitle,
  title,
  type = 'line',
}: LineGraphProps) => {
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

export default LineGraph
