import React from 'react'
import { BarGraph } from '../..'

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const highchartOptions = { 
  title: {
    text: 'Hello This is a Cool Chart!',
    align: 'right'
},
}

const BarGraphLegend = (props) => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        chartOptions={highchartOptions}
        id="bar-test-2"
        legend
        title="Bar Graph with Legend"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphLegend
