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
  title: {
    text: 'Line Graph with Legend Non Clickable',
  },
  xAxis: {
    categories: categories,
  },
  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },
  legend: {
    enabled: true,
    events: {
      itemClick: function () {
        return false;
      }
    }
  },
  series: data
}

const LineGraphLegendNonclickable = () => {
  const options = Highcharts.merge({}, lineGraphTheme, chartOptions)

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </div>
  )
}

export default LineGraphLegendNonclickable