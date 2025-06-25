import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import barGraphTheme from '../barGraphTheme';

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const chartOptions = {
    title: {
      text: 'Bar Graph with Legend Non Clickable',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
  series: chartData
}

const BarGraphLegendNonClickable = () => {
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

export default BarGraphLegendNonClickable
