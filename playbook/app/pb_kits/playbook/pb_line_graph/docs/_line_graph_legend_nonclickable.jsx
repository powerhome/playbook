import React from 'react'
import { LineGraph } from 'playbook-ui'

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const LineGraphLegendNonclickable = (props) => (
  <div>
    <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        id="line-test-3"
        legend
        title="Line Graph with Legend Non Clickable"
        toggleLegendClick={false}
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
        {...props}
    />
  </div>
)

export default LineGraphLegendNonclickable
