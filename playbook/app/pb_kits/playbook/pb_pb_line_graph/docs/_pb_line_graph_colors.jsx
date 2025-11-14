import React from 'react'
import PbLineGraph from '../../pb_pb_line_graph/_pb_line_graph'
import colors from '../../tokens/exports/_colors.module.scss'

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

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const chartOptions = {
    title: {
      text: 'Line Graph with Custom Data Colors',
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Employees',
      },
    },
    series: data,
    colors: [colors.data_4, colors.data_5, "#144075", colors.data_7, colors.data_8]
  }

const PbLineGraphColors = (props) => {
  return (
    <div>
      <PbLineGraph
          options={chartOptions}
          {...props}
      />
    </div>
  )
}

export default PbLineGraphColors