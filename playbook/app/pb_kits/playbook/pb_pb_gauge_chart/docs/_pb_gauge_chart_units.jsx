import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import { colors, typography } from 'playbook-ui'


const data1 = [
  { name: 'Data Used', y: 32 },
]
const data2 = [
  { name: 'Sales to Date', y: 65 },
]

const chartOptions1 = {
  title: {
    text: "Data Usage",
  },
  series: [{ data: data1 }],
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span class="fix">{y:,f}</span>` +
          `<span style="fill: ${colors.text_lt_light}; font-size: ${typography.text_larger};">GB</span>`,
      },
    },
  },
};
const chartOptions2 = {
  title: {
    text: "Sales Goal",
  },
  series: [{ data: data2 }],
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span y="28" style="fill: ${colors.text_lt_light}; font-size: ${typography.text_base};">$</span>` +
          `<span class="fix" y="38">{y:,f}</span>` +
          `<span style="fill: ${colors.text_lt_light}; font-size: ${typography.text_larger};">k</span>`,
      },
    },
  },
};

const PbGaugeChartUnits = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions1}
        {...props}
    />
    <PbGaugeChart
        options={chartOptions2}
        {...props}
    />
  </div>
)

export default PbGaugeChartUnits
