import React from 'react'
import { CircleChart, Title } from '../../'

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
    name: 'After call',
    value: 10,
  },
]

const CircleChartBlock = () => (

  <div>
    <CircleChart
        chartData={dataWithABlock}
        id="chart-with-a-block"
        innerSize="lg"
        marginTop="xl"
        rounded
    >
      <Title
          size={1}
          tag="div"
      >
        {'83'}
      </Title>
    </CircleChart>
  </div>
)

export default CircleChartBlock
