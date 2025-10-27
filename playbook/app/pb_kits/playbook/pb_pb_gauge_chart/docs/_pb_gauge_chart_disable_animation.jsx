import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'

const data = [{ name: "Participants", y: 84 }]

const chartOptions = {
  series: [{ data: data }],
  plotOptions: {
    series: {
      animation: false,
    },
  },
};

const PbGaugeChartDisableAnimation = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions}
        {...props}
    />
  </div>
)

export default PbGaugeChartDisableAnimation
