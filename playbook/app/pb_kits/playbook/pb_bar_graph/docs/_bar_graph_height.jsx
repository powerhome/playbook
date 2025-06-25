import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import barGraphTheme from '../barGraphTheme';

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const pixelHeightChartOptions = {
  chart: {
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
    title: {
      text: "Number of Employees",
    },
  },
};

const percentageHeightChartOptions = {
  chart: {
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
    title: {
      text: "Number of Employees",
    },
  },
};

const pixelOptions = Highcharts.merge({}, barGraphTheme, pixelHeightChartOptions)

const percentageOptions = Highcharts.merge({}, barGraphTheme, percentageHeightChartOptions)

const BarGraphHeight = () => (
  <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={pixleOptions}
      />

    <br />
    <br />

    <HighchartsReact
        highcharts={Highcharts}
        options={percentageOptions}
    />
  </div>
)

export default BarGraphHeight
