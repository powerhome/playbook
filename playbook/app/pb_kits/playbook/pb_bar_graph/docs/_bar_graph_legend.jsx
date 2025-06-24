import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import barGraphTheme from '../barGraphTheme';

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const chartOptions = {
  series: chartData,
  title: {
    text: 'Solar Employment Growth by Sector, 2010-2016',
  },
  subtitle: {
    text: 'Source: thesolarfoundation.com',
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },
  legend: { enabled: true },
}

const BarGraphLegend = () => {
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
export default BarGraphLegend
