import React from 'react'
import { BarGraph } from '../../'

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const BarGraphDefault = () => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        height="300"
        id="bar-fixed-height"
        title="Fixed Height (300px)"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        yAxisMin={0}
    />

    <br />
    <br />

    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        height="50%"
        id="bar-percentage-height"
        title="Percentage Height (50%)"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        yAxisMin={0}
    />
  </div>
)

export default BarGraphDefault
