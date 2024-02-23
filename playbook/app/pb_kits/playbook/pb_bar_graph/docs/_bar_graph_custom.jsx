import React from 'react'

import BarGraph from '../_bar_graph'

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

const barGraphOptions = {
  subtitle: {
    text: "Overwritten subtitle",
    style: {
      color: "red"
    }
  },
  xAxis: {
      labels: {
          useHTML: true,
          formatter: function() {
              switch (this.value) {
                  case 'Jan':
                      return `<i class="far fa-apple-whole"></i> ${this.value}`
                  case 'Feb':
                      return `<i class="far fa-strawberry"></i> ${this.value}`
                  case 'Mar':
                      return `<i class="far fa-lemon"></i> ${this.value}`
                  case 'Apr':
                      return `<i class="far fa-pear"></i> ${this.value}`
                  case 'May':
                      return `<i class="far fa-peach"></i> ${this.value}`
                  default:
                      return ''
              }
          }
      }
  }
}

const BarGraphCustom = (props) => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        customOptions={barGraphOptions}
        id="bar-custom"
        subTitle="Subtitle to replace"
        title="Bar Graph with Custom Overrides"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphCustom
