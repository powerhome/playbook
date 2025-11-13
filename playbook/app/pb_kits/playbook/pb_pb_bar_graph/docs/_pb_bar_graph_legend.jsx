import React from 'react'
import PbBarGraph from '../_pb_bar_graph'


const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const chartOptions = {
  series: chartData,
  title: {
    text: 'Bar Graph with Legend',
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },
  legend: { enabled: true },
}

const PbBarGraphLegend = () => {
  
  return (
    <div>
      <PbBarGraph
          options={chartOptions}
      />
    </div>
  )
}
export default PbBarGraphLegend
