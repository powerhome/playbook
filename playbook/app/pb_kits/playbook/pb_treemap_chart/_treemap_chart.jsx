/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import pbChart from '../plugins/pb_chart'

type TreemapChartProps = {
  dark?: Boolean,
  chartData: array<{
    name: string,
    parent?: string | number,
    data: number,
  }>,
  className?: string,
  id: number,
  subTitle?: string,
  title: string,
  type?: string,
  height?: string,
  colors: array,
  drillable: Boolean,
  tooltipHtml: String,
  useHtml: Boolean,
  grouped: Boolean,
}

export default class TreemapChart extends React.Component<TreemapChartProps> {
  static defaultProps = {
    className: 'pb_treemap_chart',
    dark: false,
    type: 'treemap',
    drillable: false,
    grouped: false,
  }

  componentDidMount() {
    const {
      dark,
      className,
      chartData,
      id,
      subTitle,
      title,
      type,
      height,
      colors  = [],
      drillable,
      tooltipHtml = '<span style="font-weight: bold; color:{point.color};">● </span>{point.name}: <b>{point.value}</b>',
      useHtml = false,
      grouped,
    } = this.props

    new pbChart(`.${className}`, {
      dark,
      chartData: chartData,
      colors: colors,
      id: id,
      subtitle: subTitle,
      type,
      title: title,
      height: height,
      drillable,
      tooltipHtml,
      useHtml,
      grouped,
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
