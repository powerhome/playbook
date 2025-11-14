import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import colors from '../../tokens/exports/_colors.module.scss'

const data = [{ name: "Name", y: 67 }]

const chartOptions = {
  series: [{ data: data }],
  plotOptions: {
    solidgauge: {
      borderColor: colors.data_7,
    }
  },
};
const PbGaugeChartColor = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions}
        {...props}
    />
  </div>
)

export default PbGaugeChartColor
