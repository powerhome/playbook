import React from 'react'
import { BarGraph } from '../..'

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const BarGraphLegendNonClickable = () => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="bar-test-3"
        legend
        legendClick={false}
        title="Bar Graph with Legend Non Clickable"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
    />
  </div>
)

export default BarGraphLegendNonClickable
