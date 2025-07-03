import React from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const dataWithTitle = [
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

const CircleChartWithTitle = () => {
  const chartOptions = {
    title: { text: "Active Users on Social Media" },
    series: [{ data: dataWithTitle }],
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

export default CircleChartWithTitle