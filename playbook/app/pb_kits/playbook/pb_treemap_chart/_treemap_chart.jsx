/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import pbChart from '../plugins/pb_chart'

type TreemapChartProps = {
  chartData: array<{
    name: string,
    parent?: string | number,
    value: number,
    color?: string,
    id?: string | number,
  }>,
  className?: string,
  colors: array,
  dark?: boolean,
  drillable: boolean,
  grouped: boolean,
  height?: string,
  id: number,
  title: string,
  tooltipHtml: string,
  type?: string,
}

export default class TreemapChart extends React.Component<TreemapChartProps> {
  static defaultProps = {
    className: 'pb_treemap_chart',
    dark: false,
    drillable: false,
    grouped: false,
    type: 'treemap',
  }

  componentDidMount() {
    const {
      chartData,
      className,
      colors  = [],
      dark,
      drillable,
      grouped,
      height,
      id,
      title = "",
      tooltipHtml = '<span style="font-weight: bold; color:{point.color};">&#9679; </span>{point.name}: <b>{point.value}</b>',
      type,
    } = this.props

    new pbChart(`.${className}`, {
      chartData: chartData,
      colors: colors,
      dark,
      drillable,
      grouped,
      height: height,
      id: id,
      title: title,
      tooltipHtml,
      type,
    })
  }

  props: TreemapChartProps

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
