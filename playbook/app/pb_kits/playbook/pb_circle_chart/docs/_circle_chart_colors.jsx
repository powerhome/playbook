import React from 'react'
import { CircleChart } from '../../'

const dataWithColors = [
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

const CircleChartColors = () => (
  <div>
    <CircleChart
        chartData={dataWithColors}
        colors={['data-6', 'data-4', 'data-2']}
        id="colors-example"
    />
  </div>
)

export default CircleChartColors
