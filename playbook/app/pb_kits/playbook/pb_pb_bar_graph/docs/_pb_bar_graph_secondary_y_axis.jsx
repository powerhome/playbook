import React from 'react'
import { PbBarGraph } from 'playbook-ui'

import colors from '../../tokens/exports/_colors.module.scss'
import typography from '../../tokens/exports/_typography.module.scss'

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}, {
  type: 'spline',
  name: 'Percentage',
  data: [48, 70, 25, 55, 72],
  color: '#F9BB00',
  yAxis: 1
}]

const chartOptions = {
  series: chartData,
  title: {
    text: "Bar Graph with Secondary Y-axis",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May"],
  },
  yAxis: [{
    labels: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
    title: {
      text: "Number of Employees",
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
  }, {
    labels: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
    title: {
      text: "Percentage",
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },

    opposite: true,
    min: 0,
    max: 100
  }],
  legend: { enabled: true },
}

const PbBarGraphSecondaryYAxis = () => {

  return (
    <div>
      <PbBarGraph
          options={chartOptions}
      />
    </div>
  )
}

export default PbBarGraphSecondaryYAxis