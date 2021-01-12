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
