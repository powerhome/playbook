import React from 'react'
import lineGraphTheme from '../lineGraphTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const data = [{
  name: 'Number of Installations',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const LineGraphHeight = () => {
  const chartOptionsFirst = {
    title: {
      text: 'Fixed Height (300px)',
    },
    chart: {
      height: '300px'
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Employees',
      },
    },
    series: data
  }

  const chartOptionsSecond = {
    title: {
      text: 'Percentage Height (50%)',
    },
    chart: {
      height: '50%'
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Employees',
      },
    },
    series: data
  }

  const optionsFirst = Highcharts.merge({}, lineGraphTheme, chartOptionsFirst)
  const optionsSecond = Highcharts.merge({}, lineGraphTheme, chartOptionsSecond)

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={optionsFirst}
      />

      <HighchartsReact
          highcharts={Highcharts}
          options={optionsSecond}
      />
    </div>
  )
}

export default LineGraphHeight