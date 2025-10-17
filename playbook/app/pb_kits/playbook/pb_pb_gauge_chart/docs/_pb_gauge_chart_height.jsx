import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import { colors, typography } from 'playbook-ui'

const chartOptions = {
  title: {
    text: "Fixed Height in Pixels",
  },
  chart: {
    height: "400",
  },
  series: [{ data: [{ name: "Pixels", y: 400 }] }],
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span class="fix">{y:,f}</span>` +
          `<span style="fill: ${colors.text_lt_light}; font-size: ${typography.text_larger};">px</span>`,
      },
    },
  },
};

const chartOptions2 = {
  title: {
    text: "Height as Percentage of Width",
  },
  chart: {
    height: "45%",
  },
  series: [{ data: [{ name: "Percentage", y: 45 }] }],
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span class="fix">{y:,f}</span>` +
          `<span style="fill: ${colors.text_lt_light}; font-size: ${typography.text_larger};">px</span>`,
      },
    },
  },
};

const PbGaugeChartHeight = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions}
        {...props}
    />
    <PbGaugeChart
        options={chartOptions2}
        {...props}
    />
  </div>
)

export default PbGaugeChartHeight
