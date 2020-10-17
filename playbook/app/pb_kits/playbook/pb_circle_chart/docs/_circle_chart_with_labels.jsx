import React from 'react'
import { CircleChart } from '../../'

const dataWithLabels = [
  {
    name: 'Facebook',
    value: 2498,
  },
  {
    name: 'YouTube',
    value: 2000,
  },
  {
    name: 'WhatsApp',
    value: 2000,
  },
  {
    name: 'Facebook Messenger',
    value: 1300,
  },
  {
    name: 'WeChat',
    value: 1165,
  },
  {
    name: 'Instagram',
    value: 1000,
  },
  {
    name: 'Tik Tok',
    value: 800,
  },
]

const CircleChartWithLabels = () => (
  <div>
    <CircleChart
        chartData={dataWithLabels}
        dataLabels
        id="with-labels-example"
    />
  </div>
)

export default CircleChartWithLabels
