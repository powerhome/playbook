import React from 'react'

import BarGraph from '../_bar_graph'

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}, {
  type: 'spline',
  name: 'Percentage',
  data: [48, 70, 25, 55, 72],
  color: '#F9BB00',
  yAxis: 1
}]

const axisTitles = [ {name: "Number of Installations"}, {name: "Percentage"}]

const axisFormats = [{format: ""}, {format: "{value}%"}]

const BarGraphSecondaryYAxis= (props) => (
  <div>
    <BarGraph
        axisFormat={axisFormats}
        axisTitle={axisTitles}
        chartData={chartData}
        id="bar-spline"
        legend
        title="Bar Graph with Secondary Y-axis"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphSecondaryYAxis
