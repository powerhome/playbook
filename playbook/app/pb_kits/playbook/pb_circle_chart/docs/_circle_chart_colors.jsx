import React from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import colors from '../../tokens/exports/_colors.module.scss'

const dataWithColors = [
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

const CircleChartColors = () => {
  const chartOptions = {
    series: [{ data: dataWithColors }],
    plotOptions: {
      pie: {
        colors: ["#144075", colors.data_4, colors.data_2]
      }
    }
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

export default CircleChartColors