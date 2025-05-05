import React from 'react'

import CircleChart from '../_circle_chart'
import Title from '../../pb_title/_title'

const dataWithABlock = [
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

const CircleChartBlock = (props) => (

  <div>
    <CircleChart
        chartData={dataWithABlock}
        id="chart-with-a-block"
        innerSize="lg"
        marginTop="xl"
        rounded
        {...props}
    >
      <Title
          size={1}
          tag="div"
          {...props}
      >
        {'83'}
      </Title>
    </CircleChart>
  </div>
)

export default CircleChartBlock
