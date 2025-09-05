import React from 'react'
import { PbBarGraph } from 'playbook-ui'

  const chartData = [{
    name: 'Installation',
    data: [1475, 200, 3000, 654, 656],
  }, {
    name: 'Manufacturing',
    data: [4434, 524, 2320, 440, 500],
  }, {
    name: 'Sales & Distribution',
    data: [3387, 743, 1344, 434, 440],
  }, {
    name: 'Project Development',
    data: [3227, 878, 999, 780, 1000],
  }, {
    name: 'Other',
    data: [1111, 677, 3245, 500, 200],
  }]

  const chartOptions = {
    series: chartData,
    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016',
    },
    subtitle: {
      text: 'Source: thesolarfoundation.com',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },
  }

const PbBarGraphDefault = (props) => {

  return (
    <div>
      <PbBarGraph
          {...props}
          options={chartOptions}
      />
    </div>
  )
}

export default PbBarGraphDefault
