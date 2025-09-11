import React from 'react'
import { PbBarGraph } from 'playbook-ui'


const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const chartOptions = {
    title: {
      text: 'Bar Graph with Legend Non Clickable',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
  series: chartData
}

const PbBarGraphLegendNonClickable = () => {

  return (
    <div>
      <PbBarGraph
          options={chartOptions}
      />
    </div>
  )
}

export default PbBarGraphLegendNonClickable
