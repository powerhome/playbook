import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'


const data = [{ name: "Score", y: 780 }]

const chartOptions = {
  title: {
    text: "Credit Score",
  },
  yAxis: {
    min: 300,
    max: 850,
  },
  series: [{ data: data }],
};

const PbGaugeChartTitle = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions}
        {...props}
    />
  </div>
)

export default PbGaugeChartTitle
