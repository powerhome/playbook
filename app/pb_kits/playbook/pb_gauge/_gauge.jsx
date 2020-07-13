/* @flow */

import React, { useEffect, useRef } from 'react'
import { pbChart } from '../'
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
  subtitle: String,
  suffix: String,
  title: String,
  tooltipHtml: String,
  // units: String,
}

const Gauge = ({
  aria = {},
  className,
  chartData,
  data = {},
  fullCircle = false,
  height = null,
  id,
  max = 100,
  min = 0,
  prefix = '',
  showLabels = false,
  style = 'solidgauge',
  subtitle = '',
  suffix = '',
  title = '',
  tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' + '<b>{point.y}</b>',
  // units = '',
}: GaugeProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = buildCss({
    'pb_gauge_kit': true,
  })
  // Runs first time component Renders
  useEffect(() => {
    chartData.forEach((obj) => {
      obj.y = obj.value
      delete obj.value
    })

    new pbChart('.selector', {
      id: id,
      chartData: chartData,
      circumference: fullCircle ? [0, 360] : [-100, 100],
      height: height,
      min: min,
      max: max,
      prefix: prefix,
      title: title,
      subtitle: subtitle,
      // units: units,
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
        className={classnames(css, className)}
        id={id}
    />
  )
}

export default Gauge
