import React from 'react'
import { LineGraph } from '../..'

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const LineGraphLegend = () => (
  <div>
    <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        id="bar-test-2"
        legend
        title="Line Graph with Legend"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
        yAxisMin={0}
    />
  </div>
)

export default LineGraphLegend
