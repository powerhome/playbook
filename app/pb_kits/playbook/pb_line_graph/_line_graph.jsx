/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'
import { pbChart } from '../'

type LineGraphProps = {
  axisTitle?: String,
  xAxisCategories: Array,
  yAxisMin: Number,
  yAxisMax: Number,
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
  type?: String,
  legend?: Boolean,
  toggleLegendClick?: Boolean,
  height?: String,
}

export default class LineGraph extends React.Component<LineGraphProps> {
  static defaultProps = {
    className: 'pb_bar_graph',
    gradient: false,
    type: 'line',
    legend: false,
    toggleLegendClick: true,
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
      toggleLegendClick,
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
      toggleLegendClick: toggleLegendClick,
      height: height,
    })
  }

  props: LineGraphProps

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
