import React from 'react'
import { CircleChart } from '../../'

const dataFirst = [
  {
    name: 'Bugs',
    value: 8,
  },
  {
    name: 'Chores',
    value: 1,
  },
  {
    name: 'Stories',
    value: 12,
  },
]

const dataSecond = [
  {
    name: 'Queued',
    value: 7,
  },
  {
    name: 'In Progress',
    value: 6,
  },
  {
    name: 'Validation',
    value: 3,
  },
  {
    name: 'Done',
    value: 6,
  },
]

const dataThird = [
  {
    name: '1 Point Tickets',
    value: 2,
  },
  {
    name: '3 Point Tickets',
    value: 5,
  },
  {
    name: '5 Point Tickets',
    value: 6,
  },
  {
    name: '8 Point Tickets',
    value: 3,
  },
  {
    name: '13 Point Tickets',
    value: 1,
  },
]
const dataFourth = [
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

const CircleChartInnerSizes = () => (
  <div>
    <CircleChart
        chartData={dataFirst}
        id="with-innersize-sm"
        innerSize="sm"
    />
    <CircleChart
        chartData={dataSecond}
        id="with-innersize-md"
        innerSize="md"
    />
    <CircleChart
        chartData={dataThird}
        id="with-innersize-lg"
        innerSize="lg"
    />
    <CircleChart
        chartData={dataFourth}
        className="poop"
        id="with-innersize-none "
        innerSize="none"
    />
  </div>
)

export default CircleChartInnerSizes
