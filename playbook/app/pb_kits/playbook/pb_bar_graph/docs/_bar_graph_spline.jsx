import React from 'react'

import BarGraph from '../_bar_graph'

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}, {
  type: 'spline',
  name: 'Trend Line',
  data: [1975, 600, 2500, 924, 500],
  color: '#0056cf',
}]

const BarGraphSpline = (props) => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="bar-spline"
        legend
        title="Bar Graph with Spline"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphSpline
