import React from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const data = [
  {
    name: 'Waiting for Calls',
    y: 41,
  },
  {
    name: 'On Call',
    y: 49,
  },
  {
    name: 'After Call',
    y: 10,
  },
]

const CircleChartCustomTooltip = () => {
  const chartOptions = {
    series: [{ data: data }],
    tooltip: {
      headerFormat: null,
      pointFormat: '<p>Custom tooltip for {point.name} <br/>with value: {point.y}</p>',
      useHTML: true,
    },
  }

  const options = Highcharts.merge({}, circleChartTheme, chartOptions)

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </div>
  )
}

export default CircleChartCustomTooltip