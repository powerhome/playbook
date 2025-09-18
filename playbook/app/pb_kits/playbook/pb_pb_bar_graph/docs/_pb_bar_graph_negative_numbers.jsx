import React from 'react'
import { PbBarGraph } from 'playbook-ui'


const chartData = [{
  name: 'Installation',
  data: [-475, 400, -1000, 354, -856],
  threshold: 0
}, {
  name: 'Manufacturing',
  data: [1475, 200, 1000, 654, -656],
  threshold: 0
},
{
  name: 'Sales & Distribution',
  data: [1270, 100, -1200, 554, 756],
  threshold: 0
}]

const chartOptions = {
  series: chartData,
  title: {
    text: "Bar Graph with Negative Numbers",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May"],
  },
  yAxis: {
    title: {
      text: "Number of Employees",
    },
  },
  legend: { enabled: true },
};


const PbBarGraphStacked = () => {

  return(
    <div>
      <PbBarGraph
          options={chartOptions}
      />
    </div>
  )
}

export default PbBarGraphStacked
