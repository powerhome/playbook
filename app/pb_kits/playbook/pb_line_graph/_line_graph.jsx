/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'
import { pbChart } from '../'

type LineGraphProps = {
  axisTitle?: string,
  xAxisCategories: array,
  yAxisMin: number,
  yAxisMax: number,
  className?: string,
  chartData: array<{
      name: string,
      data: array<number>,
  }>,
  gradient?: boolean,
  id: string,
  pointStart: number,
  subTitle?: string,
  title: string,
  type?: string,
  legend?: boolean,
  toggleLegendClick?: boolean,
  height?: string,
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
          className={classnames(className, globalProps(this.props))}
          id={id}
      />
    )
  }
}
