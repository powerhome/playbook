import React from 'react'
import PbLineGraph from '../../pb_pb_line_graph/_pb_line_graph'

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

const chartOptions = {
  title: {
    text: 'Line Graph with Legend Non Clickable',
  },
  xAxis: {
    categories: categories,
  },
  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },
  legend: {
    enabled: true,
    events: {
      itemClick: function () {
        return false;
      }
    }
  },
  series: data
}

const PbLineGraphLegendNonclickable = (props) => {
  return (
    <div>
      <PbLineGraph
          options={chartOptions}
          {...props}
      />
    </div>
  )
}

export default PbLineGraphLegendNonclickable