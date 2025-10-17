import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import { colors, typography } from 'playbook-ui'

const data = [{ name: "Capacity", y: 75 }]

const chartOptions = {
  title: {
    text: "Seating Capacity",
  },
  series: [{ data: data }],
  pane: {
    startAngle: 0,
    endAngle: 360,
  },
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span class="fix">{y:,f}</span>` +
          `<span style="fill: ${colors.text_lt_light}; font-size: ${typography.text_larger};">%</span>`,
      },
    },
  },
};


const PbGaugeChartFullCircle = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions}
        {...props}
    />
  </div>
)

export default PbGaugeChartFullCircle
