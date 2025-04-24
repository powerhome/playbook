import React from 'react'

import CircleChart from '../_circle_chart'

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
    name: 'After Call',
    value: 10,
  },
]

const CircleChartColors = (props) => (
  <div>
    <CircleChart
        chartData={dataWithColors}
        colors={['data-6', 'data-4', 'data-2']}
        id="colors-example"
        {...props}
    />
  </div>
)

export default CircleChartColors
