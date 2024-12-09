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
  yAxis: {
    tickInterval: 5,
  },
  xAxis: {
    categories: ['1', '2', '3', '4', '5'],
    labels: {
      useHTML: true,
      formatter: function () {
        switch (this.value) {
          case '1':
            return '<i style="color: red;" class="far fa-face-angry"></i>'
          case '2':
            return '<i style="color: orange;" class="far fa-face-frown"></i>'
          case '3':
            return '<i style="color: grey;" class="far fa-face-meh"></i>'
          case '4':
            return '<i style="color: #63E6BE;" class="far fa-face-smile"></i>'
          case '5':
            return '<i style="color: green;" class="far fa-face-laugh-beam"></i>'
          default:
            return ''
        }
      },
      style: {
        fontSize: '1.4em',
      },
      y: 42,
    },
  },
  legend: {
    itemMarginTop: 62,
  },
}

const BarGraphCustom = () => (
  <div>
    <BarGraph
        chartData={chartData}
        customOptions={barGraphOptions}
        id="happiness-dashboard"
        legend
        title=""
    />
  </div>
)

export default BarGraphCustom
