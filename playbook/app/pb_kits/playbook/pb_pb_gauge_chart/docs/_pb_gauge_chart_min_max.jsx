import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import { colors, typography } from 'playbook-ui'

const data = [{ name: "Rating", y: 4.5 }]

const chartOptions = {
  title: {
    text: "Product Rating",
  },
  yAxis: {
    min: 0,
    max: 5,
    lineWidth: 0,
    tickWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    tickPositions: [0, 5],
    labels: {
      y: 26,
      enabled: true,
      style: {
        color: colors.neutral,
        fontFamily: typography.font_family_base,
        fontWeight: typography.bold,
      }
    },
  },
  series: [{ data: data }],
};
const PbGaugeChartMinMax = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions}
        {...props}
    />
  </div>
)

export default PbGaugeChartMinMax
