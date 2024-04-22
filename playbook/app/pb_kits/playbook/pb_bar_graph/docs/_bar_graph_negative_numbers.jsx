import React from 'react'

import BarGraph from '../_bar_graph'

const chartData = [{
  name: 'Installation',
  data: [-475, 400, -1000, 354, -856],
  threshold: 0
}, {
  name: 'Manufacturing',
  data: [1475, 200, 1000, 654, -656],
  threshold: 0
}, 
{
  name: 'Sales & Distribution',
  data: [1270, 100, -1200, 554, 756],
  threshold: 0
}]


const BarGraphStacked = (props) => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="bar-default"
        legend
        title="Bar Graph with Negative Numbers"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        {...props}
    />
  </div>
)

export default BarGraphStacked
