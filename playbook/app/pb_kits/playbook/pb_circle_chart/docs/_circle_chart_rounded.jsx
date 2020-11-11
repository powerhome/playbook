import React from 'react'
import { CircleChart } from '../../'

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
    name: 'After call',
    value: 10,
  },
]

const CircleChartRounded = () => (
  <div>
    <CircleChart
        chartData={dataRounded}
        id="default-test-rounded"
        innerSize="lg"
        rounded
    />
  </div>
)

export default CircleChartRounded
