/* @flow */

import React from 'react'
import classnames from 'classnames'

import { pbChart } from "../"

type BarGraphProps = {
  axisTitle: String,
  chartData: Array<{
    name: String,
    data: Array<Number>,
  }>,
  className?: String | Array<String>,
  id: Number,
  pointStart: Number,
  subTitle?: String,
  title: String,
}

export default class BarGraph extends React.Component<BarGraphProps> {
  static defaultProps = {
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
          className={classnames('pb_bar_graph', className)}
          id={id}
      />
    )
  }
}
