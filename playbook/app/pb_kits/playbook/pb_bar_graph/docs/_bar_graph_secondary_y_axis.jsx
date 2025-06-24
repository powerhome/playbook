import React from 'react'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

import barGraphTheme from '../barGraphTheme';

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}, {
  type: 'spline',
  name: 'Percentage',
  data: [48, 70, 25, 55, 72],
  color: '#F9BB00',
  yAxis: 1
}]

const chartOptions = {
  series: chartData,
  title: {
    text: "Bar Graph with Secondary Y-axis",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May"],
  },
  yAxis: [{
    title: {
      text: "Number of Employees",
    },
  }, {
    title: {
      text: "Percentage",
    },
    opposite: true,
    min: 0,
    max: 100
  }],
}

const BarGraphSecondaryYAxis = () => {
  const options = Highcharts.merge({}, barGraphTheme, chartOptions)

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </div>
  )
}

export default BarGraphSecondaryYAxis