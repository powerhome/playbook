import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'

const chartOptions = {
  series:[{data:[{ name: "Name", y: 45 }]}]
}

const PbGaugeChartDefault = (props) => (
  <div>
    <PbGaugeChart
        options={chartOptions}
        {...props}
    />
  </div>
)

export default PbGaugeChartDefault
