import React from 'react'
import { LineGraph } from '../../'

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const LineGraphDefault = () => (
  <div>
    <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        id="line-fixed-height"
        title="Fixed Height (300px)"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        yAxisMin={0}
    />

    <br />
    <br />

    <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        height="50%"
        id="line-percentage-height"
        title="Percentage Height (50%)"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        yAxisMin={0}
    />
  </div>
)

export default LineGraphDefault
