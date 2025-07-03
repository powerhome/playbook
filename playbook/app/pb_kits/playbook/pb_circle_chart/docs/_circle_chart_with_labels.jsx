import React from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const dataWithLabels = [
  {
    name: 'Facebook',
    y: 2498,
  },
  {
    name: 'YouTube',
    y: 2000,
  },
  {
    name: 'WhatsApp',
    y: 2000,
  },
  {
    name: 'Facebook Messenger',
    y: 1300,
  },
  {
    name: 'WeChat',
    y: 1165,
  },
  {
    name: 'Instagram',
    y: 1000,
  },
  {
    name: 'Tik Tok',
    y: 800,
  },
]

const CircleChartWithLabels = () => {
  const chartOptions = {
    series: [{ data: dataWithLabels }],
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        }
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

export default CircleChartWithLabels