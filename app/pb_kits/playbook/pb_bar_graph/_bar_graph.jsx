/* @flow */

import React from 'react'

import pbChart from "../plugins/pb_chart_plugin.js"

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

export default class BarGraph extends React.Component<BarGraphProps> {
  static defaultProps = {
    className: 'pb_bar_graph',
    type: 'column',
  }

  componentDidMount() {
    const {
      axisTitle,
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
