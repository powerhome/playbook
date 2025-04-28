import React from 'react'

import CircleChart from '../_circle_chart'

const dataRounded = [
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

const CircleChartRounded = (props) => (
  <div>
    <CircleChart
        chartData={dataRounded}
        id="default-test-rounded"
        innerSize="lg"
        rounded
        {...props}
    />
  </div>
)

export default CircleChartRounded
