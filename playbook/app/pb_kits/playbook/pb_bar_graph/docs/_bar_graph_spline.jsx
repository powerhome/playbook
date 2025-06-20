import React from 'react'

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../BarGraphStyles.scss";
// Your path might look more like this
//import "playbook-ui/dist/pb_bar_graph/BarGraphStyles.scss";

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}, {
  type: 'spline',
  name: 'Trend Line',
  data: [1975, 600, 2500, 924, 500],
  color: '#F9BB00',
}]

const columnOptions = {
  chart: {
    type: "column",
  },
  series: chartData,
  title: {
    text: "Bar Graph with Spline",
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
};

const BarGraphSpline = () => (
  <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={columnOptions}
    />
  </div>
)

export default BarGraphSpline
