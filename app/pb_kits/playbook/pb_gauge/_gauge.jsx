/* @flow */

import React, { useEffect } from 'react'
import { pbChart } from '../'

type GaugeProps = {
  className?: String,
  chartData?: Array,
  fullCircle: Boolean,
  height: String,
  id?: String,
  max: Number,
  min: Number,
  showLabels: Boolean,
  style: String,
  subtitle: String,
  title: String,
  tooltipHtml: String,
  units: String,
}

const Gauge = ({
  className,
  chartData,
  fullCircle = false,
  height = null,
  id,
  max = 100,
  min = 0,
  showLabels = false,
  style = 'solidgauge',
  subtitle = '',
  title = '',
  tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' + '<b>{point.y}</b>',
  units = '',
}: GaugeProps) => {
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
      title: title,
      subtitle: subtitle,
      units: units,
      showLabels: showLabels,
      style: style,
      tooltipHtml: tooltipHtml,
      type: 'gauge',
    })
  })

  return (
    <div
        className={className}
        id={id}
    />
  )
}

export default Gauge
