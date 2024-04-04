import React from 'react'

import BarGraph from '../_bar_graph'

const chartData = [{
  name: 'Installation',
  data: [1475, 200, 3000, 654, 656],
}, 
{
  name: 'Manufacturing',
  data: [1270, 800, 200, 454, 956],
}, {
  name: 'Sales & Distribution',
  data: [975, 1600, 1500, 924, 500],
}]


const BarGraphStacked = (props) => (
  <div>
    <BarGraph
        axisTitle="Number Of Employees"
        chartData={chartData}
        id="bar-default"
        legend
        stacking="normal"
        title="Bar Graph with Stacked Columns"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphStacked
