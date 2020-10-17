import React from 'react'
import { CircleChart } from '../../'

const dataWithTitle = [
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

const CircleChartWithLegendKit = () => (
  <div>
    <CircleChart
        chartData={dataWithTitle}
        id="with-title-example"
        title="Active Users on Social Media"
    />
  </div>
)

export default CircleChartWithLegendKit
