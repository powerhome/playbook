import React from 'react'
import { PbBarGraph } from 'playbook-ui'

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



const PbBarGraphHeight = () => (
  <div>
      <PbBarGraph
          options={pixelHeightChartOptions}
      />

    <br />
    <br />

    <PbBarGraph
        options={percentageHeightChartOptions}
    />
  </div>
)

export default PbBarGraphHeight
