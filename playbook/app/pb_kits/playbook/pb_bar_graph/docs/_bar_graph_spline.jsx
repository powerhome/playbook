import React from 'react'

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import barGraphTheme from '../barGraphTheme';

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}, {
  type: 'spline',
  name: 'Trend Line',
  data: [1975, 600, 2500, 924, 500],
  color: '#F9BB00',
}]

const chartOptions = {
  series: chartData,
  title: {
    text: "Bar Graph with Spline",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May"],
  },
  yAxis: {
    title: {
      text: "Number of Employees",
    },
  },
  legend: { enabled: true },
};

const BarGraphSpline = () => {
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

export default BarGraphSpline
