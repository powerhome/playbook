import React from 'react'

import LineGraph from '../_line_graph'

const data = [{
  name: 'Installation',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}, {
  name: 'Manufacturing',
  data: [24916, 28064, 29742, 40851, 50590, 65282, 70121, 85434],
}, {
  name: 'Sales & Distribution',
  data: [11744, 17722, 16005, 19771, 25185, 28377, 36147, 43387],
}, {
  name: 'Project Development',
  data: [5332, 6344, 7988, 12169, 15112, 14452, 22400, 30227],
}, {
  name: 'Other',
  data: [null, null, null, 3112, 4989, 5816, 15274, 18111],
}]

const LineGraphColors = (props) => (
  <div>
    <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        colors={['data-4', 'data-5', 'data-6', 'data-7', 'data-8']}
        id="line-colors"
        title="Line Graph with Custom Data Colors"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default LineGraphColors
