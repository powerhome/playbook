/* @flow */

import React from 'react'
import classnames from 'classnames'
import { pbChart } from '../'
import { globalProps } from '../utilities/globalProps.js'

type BarGraphProps = {
  axisTitle: String,
  xAxisCategories: array,
  yAxisMin: Number,
  yAxisMax: Number,
  chartData: array<{
    name: String,
    data: array<Number>,
  }>,
  className?: String,
  id: Number,
  pointStart: Number,
  subTitle?: String,
  title: String,
  type?: String,
  legend?: Boolean,
  toggleLegendClick?: Boolean,
  height?: String,
}

export default class BarGraph extends React.Component<BarGraphProps> {
  static defaultProps = {
    className: 'pb_bar_graph',
    type: 'column',
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
      height,
      toggleLegendClick,
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

  props: BarGraphProps

  render() {
    const { className, id } = this.props

    return (
      <div
          className={classnames(className, globalProps(this.props))}
          id={id}
      />
    )
  }
}
