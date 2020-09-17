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

  const innerSizeFormat = (size) => {
    if (size == 'sm') {
      return '35%'
    }
    if (size == 'md') {
      return '50%'
    }
    if (size == 'lg') {
      return '85%'
    }
    if (size == 'none') {
      return '0%'
    }
  }

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
      id: id,
      colors: colors,
      borderColor: roundedBorderColor,
      borderWidth: roundedBorderWidth,
      chartData: formattedChartData,
      title: title,
      type: style,
      showInLegend: legend,
      dataLabelHtml: dataLabelHtml,
      dataLabels: dataLabels,
      headerFormat: headerFormat,
      tooltipHtml: tooltipHtml,
      useHTML: useHtml,
      minPointSize: minPointSize,
      maxPointSize: maxPointSize,
      innerSize: innerSizeFormat(innerSize),
      zMin: zMin,
      startAngle: startAngle,
    })
  }, [])

  const componentDidMount = useRef(false)

  // Doesn't run the first time but runs every subsequent render
  useEffect(() => {
    if (componentDidMount.current) {
      Highcharts.charts.forEach((chart) => {
        if (chart.renderTo.id === id) {
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
