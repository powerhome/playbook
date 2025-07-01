import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { barGraphTheme } from "playbook-ui";

const chartData = [{
  name: 'Installation',
  data: [1475, 200, 3000, 654, 656],
}, 
{
  name: 'Manufacturing',
  data: [1270, 800, 200, 454, 956],
}, {
  name: 'Sales & Distribution',
  data: [975, 1600, 1500, 924, 500],
}]

const chartOptions = {
  series: chartData,
  title: {
    text: "Bar Graph with Stacked Columns",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May"],
  },
  yAxis: {
    title: {
      text: "Number of Employees",
    },
  },
  plotOptions: {
    column: {
        stacking: 'normal',
        borderWidth: 0,
    }
  },
  legend: { enabled: true },
};


const BarGraphStacked = () => {
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

export default BarGraphStacked
