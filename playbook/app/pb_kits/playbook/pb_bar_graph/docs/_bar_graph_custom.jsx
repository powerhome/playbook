import React from 'react'
import BarGraph from '../_bar_graph'

const chartData = [
  {
    name: 'Role',
    data: [0, 200, 300, 654, 656],
  },
  {
    name: 'Company',
    data: [150, 524, 320, 440, 500],
  },
]

const barGraphOptions = {
  subtitle: {
    text: 'Overwritten subtitle',
    style: {
      color: 'red',
    },
  },
  xAxis: {
    legend: {
      itemMarginTop: 62,
    },
    xAxisCategories: ['Angry', 'Frown', 'Meh', 'Smile', 'Laugh'],
    labels: {
      useHTML: true,
      formatter: function () {
        switch (this.value) {
          case 'Angry':
            return '<i style="color: red;" class="far fa-face-angry"></i>'
          case 'Frown':
            return '<i style="color: orange;" class="far fa-face-frown"></i>'
          case 'Meh':
            return '<i style="color: grey;" class="far fa-face-meh"></i>'
          case 'Smile':
            return '<i style="color: #63E6BE;" class="far fa-face-smile"></i>'
          case 'Laugh':
            return '<i style="color: green;" class="far fa-laugh-beam sucess"></i>'
          default:
            return ''
        }
      },
    },
  },
}

const BarGraphCustom = (props) => (
  <div>
    <BarGraph
        chartData={chartData}
        customOptions={barGraphOptions}
        id="bar-custom"
        legend
        title="Bar Graph with Custom Overrides"
        xAxisCategories={['Angry', 'Frown', 'Meh', 'Smile', 'Laugh']}
        {...props}
    />
  </div>
)

export default BarGraphCustom
