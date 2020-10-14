/* @flow */

import React, { useEffect, useRef } from 'react'
import { pbChart } from '../'
import { globalProps } from '../utilities/globalProps'
import classnames from 'classnames'
import Highcharts from 'highcharts'

import { buildAriaProps, buildDataProps } from '../utilities/props'

type CircleChartProps = {
  aria: Object,
  chartData?: array,
  children: Node,
  className?: string,
  colors: array,
  data?: Object,
  dataLabelHtml: string,
  dataLabels: boolean,
  headerFormat: string,
  id?: string,
  innerSize: "sm" | "md" | "lg" | "none",
  legend: boolean,
  maxPointSize: number,
  minPointSize: number,
  rounded: boolean,
  startAngle: number,
  style: string,
  title: string,
  tooltipHtml: string,
  useHtml: boolean,
  zMin: number,
}

const CircleChart = (props: CircleChartProps) => {
  const {
    aria = {},
    chartData = [{}],
    children,
    className,
    colors = [],
    data = {},
    dataLabelHtml = '<div>{point.name}</div>',
    dataLabels = false,
    headerFormat = null,
    id,
    innerSize = 'md',
    legend = false,
    maxPointSize = null,
    minPointSize = null,
    rounded = false,
    startAngle = null,
    style = 'pie',
    title = '',
    tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' +
      '<b>{point.y}</b>',
    useHtml = false,
    zMin = null,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const innerSizes = { sm: '35%', md: '50%', lg: '85%', none: '0%' }
  const innerSizeFormat = (size) => innerSizes[size]
  const roundedBorderWidth = rounded ? 20 : null
  const roundedBorderColor = rounded ? null : ''

  // Runs first time component Renders
  useEffect(() => {
    const formattedChartData = chartData.map((obj) => {
      obj.y = obj.value
      delete obj.value
      return obj
    })

    new pbChart('.selector', {
      id,
      colors,
      borderColor: roundedBorderColor,
      borderWidth: roundedBorderWidth,
      chartData: formattedChartData,
      title,
      type: style,
      showInLegend: legend,
      dataLabelHtml,
      dataLabels,
      headerFormat,
      tooltipHtml,
      useHTML: useHtml,
      minPointSize,
      maxPointSize,
      innerSize: innerSizeFormat(innerSize),
      zMin,
      startAngle,
    })
  }, [])

  const componentDidMount = useRef(false)

  // Doesn't run the first time but runs every subsequent render
  useEffect(() => {
    if (componentDidMount.current) {
      Highcharts.charts.forEach((chart) => {
        if (chart && chart.renderTo.id === id) {
          const updatedValueArray = chartData.map((obj) => {
            return obj.value
          })
          chart.series[0].setData(updatedValueArray)
        }
      })
    } else {
      componentDidMount.current = true
    }
  }, [chartData])
  return (
    <div id={`wrapper-circle-chart-${id}`}>
      <div
          id={id}
          {...ariaProps}
          {...dataProps}
          className={classnames('pb_circle_chart', globalProps(props), className)}
      />
      <If condition={children}>
        <div className="pb-circle-chart-block">{children}</div>
      </If>
    </div>
  )
}

export default CircleChart
