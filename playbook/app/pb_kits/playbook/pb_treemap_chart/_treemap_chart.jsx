/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import pbChart from '../plugins/pb_chart'

type TreemapChartProps = {
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
  subTitle?: string,
  title: string,
  type?: string,
  height?: string,
  colors: array,
}

export default class TreemapChart extends React.Component<TreemapChartProps> {
  static defaultProps = {
    className: 'pb_treemap_chart',
    dark: false,
    type: 'column',
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
      subTitle,
      title,
      type,
      height,
      colors  = [],
    } = this.props

    new pbChart(`.${className}`, {
      axisTitle: axisTitle,
      dark,
      chartData: chartData,
      colors: colors,
      id: id,
      subtitle: subTitle,
      type,
      title: title,
      xAxisCategories: xAxisCategories,
      yAxisMin: yAxisMin,
      yAxisMax: yAxisMax,
      height: height,
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

// /* @flow */

// import React from 'react'
// import classnames from 'classnames'
// import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
// import { globalProps } from '../utilities/globalProps'

// type TreemapChartProps = {
//   aria?: object,
//   className?: string,
//   data?: object,
//   id?: string,
// }

// const TreemapChart = (props: TreemapChartProps) => {
//   const {
//     aria = {},
//   className,
//   data = {},
//   id,
//   } = props

//   const ariaProps = buildAriaProps(aria)
//   const dataProps = buildDataProps(data)
//   const classes = classnames(buildCss('pb_treemap_chart'), globalProps(props), className)

//   return (
//     <div
//         {...ariaProps}
//         {...dataProps}
//         className={classes}
//         id={id}
//     >
//       {className}
//     </div>
//   )
// }

// export default TreemapChart
