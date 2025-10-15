import React from 'react'
import PbLineGraph from '../../pb_pb_line_graph/_pb_line_graph'

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

const chartOptions = {
  series: data,
  title: { text: "Line Graph with Legend" },
  xAxis: {
    categories: categories,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Number of Employees",
    },
  },
  legend: {
    enabled: true,
  },
}

const PbLineGraphLegend = (props) => (
  <div>
    <PbLineGraph
        options={chartOptions}
        {...props}
    />
  </div>
)

export default PbLineGraphLegend
