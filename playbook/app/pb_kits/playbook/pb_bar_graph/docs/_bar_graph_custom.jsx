import React from 'react'

import BarGraph from '../_bar_graph'


const barGraphOptions = {
  chart: {
    type: 'column'
  },
  subtitle: {
    text: "Overridden Subtitle",
  },
  xAxis: {
      type: 'category',
      categories: ['USA', 'Canada', 'Brazil']
  },

  plotOptions: {
      series: {
          cursor: 'pointer',
          point: {
              events: {
                  click: function () {
                      location.href = 'https://en.wikipedia.org/wiki/' +
                          this.options.key;
                  }
              }
          }
      }
  },
  series: [{
      data: [{
          y: 29.9,
          name: 'USA',
          key: 'United_States'
      }, {
          y: 71.5,
          name: 'Canada',
          key: 'Canada'
      }, {
          y: 106.4,
          name: 'Brazil',
          key: 'Brazil'
      }]
  }]
}

const BarGraphCustom = (props) => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        // chartData={chartData}
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
