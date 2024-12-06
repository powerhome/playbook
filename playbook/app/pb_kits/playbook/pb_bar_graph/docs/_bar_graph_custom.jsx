import React from 'react'

import BarGraph from '../_bar_graph'

const chartData = [{
  name: 'Role',
  data: [0, 200, 300, 654, 656],
}, {
  name: 'Company',
  data: [150, 524, 320, 440, 500],
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
                  case 'Angry':
                      return `<i style="color: red; font-size: 18px;" class="far fa-face-angry"></i> `
                  case 'Frown':
                      return `<i style="color: orange; font-size: 18px;" class="far fa-face-frown"></i>`
                  case 'Meh':
                      return `<i style="color: grey; font-size: 18px;" class="far fa-face-meh"></i>`
                  case 'Smile':
                      return `<i style="color: #63E6BE; font-size: 18px;" class="far fa-face-smile"></i>`
                  case 'Laugh':
                      return `<i style="color: green; font-size: 18px;" class="far fa-laugh-beam sucess"></i>`
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
        chartData={chartData}
        customOptions={barGraphOptions}
        id="bar-custom"
        legend
        subTitle="Subtitle to replace"
        title="Bar Graph with Custom Overrides"
        xAxisCategories={['Angry', 'Frown', 'Meh', 'Smile', 'Laugh']} 
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphCustom
