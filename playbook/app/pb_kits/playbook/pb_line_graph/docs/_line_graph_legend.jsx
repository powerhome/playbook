import React from 'react'
import lineGraphTheme from '../lineGraphTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

const chartOptions = {
  series: data,
  title: { text: "Line Graph with Legend" },
  xAxis: {
    categories: categories,
  },
  yAxis: {
    min: 0,
    title: {
      text: "Number of Employees",
    },
  },
  legend: {
    enabled: true,
  },
}

const LineGraphLegend = () => {
  const options = Highcharts.merge({}, lineGraphTheme, chartOptions)

  return(
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </div>
  )
}

export default LineGraphLegend