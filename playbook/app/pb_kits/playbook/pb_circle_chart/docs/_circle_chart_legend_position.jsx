import React from 'react'

import CircleChart from '../_circle_chart'

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

const CircleChartLegendPosition = (props) => (
  <div>
    <CircleChart
        align='center'
        chartData={dataWithLegend}
        id="legend-position"
        layout="vertical"
        legend
        verticalAlign="top"
        x={50}
        y={50}
        {...props}
    />
  </div>
)

export default CircleChartLegendPosition