/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import pbChart from '../plugins/pb_chart'

type LineGraphProps = {
  align?: "left" | "right" | "center",
  axisTitle?: string,
  dark?: Boolean,
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
  colors: array,
  layout?: "horizontal" | "vertical" | "proximate",
  verticalAlign?: "top" | "middle" | "bottom",
  x?: number,
  y?: number,
  }

export default class LineGraph extends React.Component<LineGraphProps> {
  static defaultProps = {
    align: "center",
    className: 'pb_bar_graph',
    dark: false,
    gradient: false,
    type: 'line',
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
      toggleLegendClick,
      height,
      colors = [],
      layout,
      verticalAlign,
      x,
      y,
    } = this.props

    new pbChart(`.${className}`, {
      align,
      axisTitle: axisTitle,
      chartData: chartData,
      colors: colors,
      dark,
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
      verticalAlign,
      x,
      y,
    })
  }

  props: LineGraphProps

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
