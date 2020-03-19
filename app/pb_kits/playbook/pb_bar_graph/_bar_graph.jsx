/* @flow */

import React from 'react'

import { pbChart } from '../'

type BarGraphProps = {
  axisTitle: String,
  xAxisCategories: Array,
  yAxisMin: Number,
  yAxisMax: Number,
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

export default class BarGraph extends React.Component<BarGraphProps> {
  static defaultProps = {
    className: 'pb_bar_graph',
    type: 'column',
  }

  componentDidMount() {
    const {
      axisTitle,
      xAxisCategories,
      yAxisMin,
      yAxisMax,
      className,
      chartData,
      id,
      pointStart,
      subTitle,
      title,
      type,
    } = this.props

    new pbChart(`.${className}`, {
      axisTitle: axisTitle,
      chartData: chartData,
      id: id,
      pointStart: pointStart,
      subtitle: subTitle,
      type,
      title: title,
      xAxisCategories: xAxisCategories,
      yAxisMin: yAxisMin,
      yAxisMax: yAxisMax,
    })
  }

  props: BarGraphProps

  render() {
    const { className, id } = this.props

    return (
      <div
          className={className}
          id={id}
      />
    )
  }
}
