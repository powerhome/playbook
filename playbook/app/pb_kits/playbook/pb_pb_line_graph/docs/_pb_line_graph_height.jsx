import React from 'react'
import PbLineGraph from '../../pb_pb_line_graph/_pb_line_graph'

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const chartOptionsFirst = {
    title: {
      text: 'Fixed Height (300px)',
    },
    chart: {
      height: '300px'
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
    series: data
  }

  const chartOptionsSecond = {
    title: {
      text: 'Percentage Height (50%)',
    },
    chart: {
      height: '50%'
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
    series: data
  }

const PbLineGraphHeight = (props) => {
  return (
    <div>
      <PbLineGraph
          options={chartOptionsFirst}
          {...props}
      />
      <PbLineGraph
          options={chartOptionsSecond}
          {...props}
      />
    </div>
  )
}

export default PbLineGraphHeight