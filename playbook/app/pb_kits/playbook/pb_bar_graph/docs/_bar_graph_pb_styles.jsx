import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

//import '../BarGraphStyles.scss'

const columnChartData = [
  {
    name: "Installation",
    data: [1475, 200, 3000, 654, 656],
  },
  {
    name: "Manufacturing",
    data: [4434, 524, 2320, 440, 500],
  },
  {
    name: "Sales & Distribution",
    data: [3387, 743, 1344, 434, 440],
  },
  {
    name: "Project Development",
    data: [3227, 878, 999, 780, 1000],
  },
  {
    name: "Other",
    data: [1111, 677, 3245, 500, 200],
  },
];

const columnOptions = {
  chart: {
    type: "column",
    styledMode: true,
  },
  series: columnChartData,
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

const BarGraphPbStyles = () => (
  <div>
    pb stylesx
    <HighchartsReact highcharts={Highcharts}
        options={columnOptions}
    />
  </div>
)

export default BarGraphPbStyles
