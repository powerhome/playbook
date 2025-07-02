import React from 'react'
import barGraphTheme from '../barGraphTheme';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


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
    text: "Fixed Height (300px)",
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
    text: "Percentage Height (50%)",
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
          options={pixelOptions}
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
