import React, { useState } from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import Button from '../../pb_button/_button'

const CircleChartLiveData = (props) => {
  const [data, setData] = useState([
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
  ])

  const data2 = [
    {
      name: 'Waiting for Calls',
      y: 48,
    },
    {
      name: 'On Call',
      y: 12,
    },
    {
      name: 'After Call',
      y: 140,
    },
  ]

  const updateValue = () => {
    setData(data2)
  }

  const chartOptions = {
    series: [{ data: data }],
  }

  const options = Highcharts.merge({}, circleChartTheme, chartOptions)

  return (
    <div>
      <Button
          onClick={updateValue}
          text="Update Value"
          {...props}
      />
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </div>
  )
}

export default CircleChartLiveData