import React from 'react'
import barGraphTheme from '../barGraphTheme';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const chartOptions = {
  series: chartData,
  title: {
    text: 'Bar Graph with Legend',
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
