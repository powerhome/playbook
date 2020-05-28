/* @flow */

import React from 'react'
import classnames from 'classnames'
import { pbChart } from '../'
import { spacing } from '../utilities/spacing.js'

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
  legend?: Boolean,
  height?: String,
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
      legend,
      height,
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
      legend: legend,
      height: height,
    })
  }

  props: BarGraphProps

  render() {
    const { className, id } = this.props

    return (
      <div
          className={classnames(className, spacing(this.props))}
          id={id}
      />
    )
  }
}
