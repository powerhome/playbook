/* @flow */

import React, { useEffect, useRef } from 'react'
import { pbChart } from '../'
import { spacing } from '../utilities/spacing.js'
import classnames from 'classnames'
import Highcharts from 'highcharts'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type GaugeProps = {
  aria: Object,
  className?: String,
  chartData?: Array,
  data?: Object,
  fullCircle: Boolean,
  height: String,
  id?: String,
  max: Number,
  min: Number,
  prefix: String,
  showLabels: Boolean,
  style: String,
  suffix: String,
  title: String,
  tooltipHtml: String,
}

const Gauge = (props: GaugeProps) => {
  const {
    aria = {},
    className,
    chartData = [{ name: 'Name', value: 0 }],
    data = {},
    fullCircle = false,
    height = null,
    id,
    max = 100,
    min = 0,
    prefix = '',
    showLabels = false,
    style = 'solidgauge',
    suffix = '',
    title = '',
    tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' + '<b>{point.y}</b>',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = buildCss({
    'pb_gauge_kit': true,
  })
  // Runs first time component Renders
  useEffect(() => {
    const formattedChartData = chartData.map((obj) => {
      obj.y = obj.value
      delete obj.value
      return obj
    })

    new pbChart('.selector', {
      id: id,
      chartData: formattedChartData,
      circumference: fullCircle ? [0, 360] : [-100, 100],
      height: height,
      min: min,
      max: max,
      prefix: prefix,
      title: title,
      suffix: suffix,
      showLabels: showLabels,
      style: style,
      tooltipHtml: tooltipHtml,
      type: 'gauge',
    })
  }, [])

  const componentDidMount = useRef(false)
  // Doesn't run the first time but runs every subsequent render
  useEffect(() => {
    if (componentDidMount.current) {
      Highcharts.charts.forEach((chart) => {
        if (chart.renderTo.id === id) {
          chart.series[0].setData([chartData[0].value])
        }
      })
    } else {
      componentDidMount.current = true
    }
  })
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, className, spacing(props))}
        id={id}
    />
  )
}

export default Gauge
