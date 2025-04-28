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

const CircleChartCustomTooltip = (props) => (
  <div>
    <CircleChart
        chartData={data}
        id="circle-chart-default"
        tooltipHtml= '<p>Custom tooltip for {point.name} <br/>with value: {point.y}</p>'
        {...props}
    />
  </div>
)

export default CircleChartCustomTooltip
