/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import pbChart from '../plugins/pb_chart'

type BarGraphProps = {
  align?: "left" | "right" | "center",
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
  layout?: "horizontal" | "vertical" | "proximate",
  verticalAlign?: "top" | "middle" | "bottom",
  x?: number,
  y?: number,
}

export default class BarGraph extends React.Component<BarGraphProps> {
  static defaultProps = {
    align: "center",
    className: 'pb_bar_graph',
    dark: false,
    type: 'column',
    legend: false,
    toggleLegendClick: true,
    layout: "horizontal",
    verticalAlign: "bottom",
    x: 0,
    y: 0,
  }

  componentDidMount() {
    const {
      align,
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
      layout,
      verticalAlign,
      x,
      y,
    } = this.props

    new pbChart(`.${className}`, {
      align: align,
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
      layout,
      verticalAlign: verticalAlign,
      x: x,
      y: y,
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
