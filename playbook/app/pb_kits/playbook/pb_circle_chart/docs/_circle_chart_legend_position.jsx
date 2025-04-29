import React from 'react'

import CircleChart from '../_circle_chart'

import Title from '../../pb_title/_title'

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

const dataFirst = [{
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


const CircleChartLegendPosition = (props) => (
  <div>
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="align | verticalAlign"
    />
    <CircleChart
        align='right'
        chartData={data}
        id="legend-position-circle"
        legend
        paddingBottom="sm"
        title="Alignment of Legend"
        verticalAlign="top"
        {...props}
    />
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="layout"
    />
    <CircleChart
        chartData={dataFirst}
        id="legend-position-circle-1"
        layout="vertical"
        legend
        paddingBottom="sm"
        paddingTop="sm"
        title="Layout of Legend"
        {...props}
    />
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="x | y"
    />
    <CircleChart
        chartData={dataSecond}
        id="legend-position-circle-2"
        layout="vertical"
        legend
        title="Offset of Legend"
        x={100}
        y={10}
        {...props}
    />
  </div>
)

export default CircleChartLegendPosition