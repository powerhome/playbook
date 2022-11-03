import React from 'react'
import { BarGraph } from '../..'

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

const BarGraphLegendPosition = (props) => (
  <div>
    <BarGraph
        align='left'
        axisTitle="Number of Employees"
        chartData={chartData}
        id="legend-position"
        layout="vertical"
        legend
        title="Bar Graph with Legend"
        verticalAlign="middle"
        x={10}
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        y={50}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphLegendPosition