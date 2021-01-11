import React from 'react'
import { CircleChart } from '../../'

const dataWithLegend = [{
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

const CircleChartWithLegendKit = (props) => (
  <div>
    <CircleChart
        chartData={dataWithLegend}
        id="with-legend-example"
        legend
        {...props}
    />
  </div>
)

export default CircleChartWithLegendKit
