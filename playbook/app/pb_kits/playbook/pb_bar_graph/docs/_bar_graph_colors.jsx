import React from 'react'

import BarGraph from '../_bar_graph'

const chartData = [{
  name: 'Installation',
  data: [1475, 200, 3000, 654, 656],
}, {
  name: 'Manufacturing',
  data: [4434, 524, 2320, 440, 500],
}, {
  name: 'Sales & Distribution',
  data: [3387, 743, 1344, 434, 440],
}, {
  name: 'Project Development',
  data: [3227, 878, 999, 780, 1000],
}, {
  name: 'Other',
  data: [1111, 677, 3245, 500, 200],
}]

const BarGraphColors = (props) => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        colors={['data-4', 'data-5', 'data-6', 'data-7', 'data-8']}
        id="bar-colors"
        title="Bar Graph with Custom Data Colors"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphColors
