/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps.js'
import pbChart from '../plugins/pb_chart'

type BarGraphProps = {
  axisTitle: string,
  dark?: Boolean,
  xAxisCategories: array,
  yAxisMin: number,
  yAxisMax: number,
  chartData: array<{
    name: string,
    data: array<number>,
  }>,
  className?: string,
  id: number,
  pointStart: number,
  subTitle?: string,
  title: string,
  type?: string,
  legend?: boolean,
  toggleLegendClick?: boolean,
  height?: string,
  colors: array,
}

export default class BarGraph extends React.Component<BarGraphProps> {
  static defaultProps = {
    className: 'pb_bar_graph',
    dark: false,
    type: 'column',
    legend: false,
    toggleLegendClick: true,
  }

  componentDidMount() {
    const {
      axisTitle,
      dark,
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
      colors  = [],
    } = this.props

    new pbChart(`.${className}`, {
      axisTitle: axisTitle,
      dark,
      chartData: chartData,
      colors: colors,
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
          className={classnames(globalProps(this.props), className)}
          id={id}
      />
    )
  }
}
