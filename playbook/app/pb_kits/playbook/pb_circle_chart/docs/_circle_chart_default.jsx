import React from 'react'

import CircleChart from '../_circle_chart'

const data = [
  {
    name: 'Waiting for Calls',
    value: 41,
  },
  {
    name: 'On Call',
    value: 49,
  },
  {
    name: 'After Call',
    value: 10,
  },
]

const CircleChartDefault = (props) => (
  <div>
    <CircleChart
        chartData={data}
        id="circle-chart-default"
        {...props}
    />
  </div>
)

export default CircleChartDefault
