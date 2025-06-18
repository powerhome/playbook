import React from 'react'


import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../BarGraphStyles.scss";
// Your path might look more like this
//import "playbook-ui/dist/pb_bar_graph/BarGraphStyles.scss";

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

const columnOptions = {
  chart: {
    type: "column",
  },
  series: chartData,
  title: {
    text: "Bar Graph with Stacked Columns",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May"],
  },
  yAxis: {
    min: 0,
    title: {
      text: "Number of Employees",
    },
  },
  credits: { enabled: false },
  plotOptions: {
    column: {
        stacking: 'normal',
        borderWidth: 0,
    }
  },
};


const BarGraphStacked = () => (
  <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={columnOptions}
    />
  </div>
)

export default BarGraphStacked
