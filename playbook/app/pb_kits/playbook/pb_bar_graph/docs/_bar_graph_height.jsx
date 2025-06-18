import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../BarGraphStyles.scss";
// Your path might look more like this
//import "playbook-ui/dist/pb_bar_graph/BarGraphStyles.scss";

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const pixleHeightChartOptions = {
  chart: {
    type: "column",
    height: "300"
  },
  series: chartData,
  title: {
    text: "Solar Employment Growth by Sector, 2010-2016",
  },
  subtitle: {
    text: "Source: thesolarfoundation.com",
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
  legend: { enabled: false },
  credits: { enabled: false },
};

const percentageHeightChartOptions = {
  chart: {
    type: "column",
    height: "50%"
  },
  series: chartData,
  title: {
    text: "Solar Employment Growth by Sector, 2010-2016",
  },
  subtitle: {
    text: "Source: thesolarfoundation.com",
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
  legend: { enabled: false },
  credits: { enabled: false },
};

const BarGraphHeight = () => (
  <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={pixleHeightChartOptions}
      />

    <br />
    <br />

    <HighchartsReact
        highcharts={Highcharts}
        options={percentageHeightChartOptions}
    />
  </div>
)

export default BarGraphHeight
