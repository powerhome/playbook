import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../BarGraphStyles.scss";
// Your path might look more like this
//import "playbook-ui/dist/pb_bar_graph/BarGraphStyles.scss";

import Title from "../../pb_title/_title"

const chartData = [{
  name: 'Installation',
  data: [1475],
}, {
  name: 'Manufacturing',
  data: [4434],
}, {
  name: 'Sales & Distribution',
  data: [3387],
}, {
  name: 'Project Development',
  data: [3227],
}, {
  name: 'Other',
  data: [1111],
}]

const alignChartOptions = {
  chart: {
    type: 'column',
  },
  series: chartData,
  title: {
    text: 'Alignment of Legend',
  },
  subtitle: {
    text: 'Source: thesolarfoundation.com',
  },
  xAxis: {
    categories: ['Jan'],
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Employees',
    },
  },
  legend: { 
    enabled: true,
    verticalAlign: 'top',
    align: 'right',
   },
  credits: { enabled: false },
}

const layoutChartOptions = {
  chart: {
    type: 'column',
  },
  series: chartData,
  title: {
    text: 'Layout of Legend',
  },
  xAxis: {
    categories: ['Jan'],
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Employees',
    },
  },
  legend: { 
    enabled: true,
    layout: 'vertical',
   },
  credits: { enabled: false },
}

const offsetChartOptions = {
  chart: {
    type: 'column',
  },
  series: chartData,
  title: {
    text: 'Offset of Legend',
  },
  xAxis: {
    categories: ['Jan'],
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Employees',
    },
  },
  legend: {
    enabled: true,
    layout: 'vertical',
    x: 100,
    y: 10,
  },
  credits: { enabled: false },
}

const BarGraphLegendPosition = () => (
  <div>
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="align | verticalAlign"
    />
    <HighchartsReact 
        highcharts={Highcharts}
        options={alignChartOptions}
    />

    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="layout"
    />
    <HighchartsReact 
        highcharts={Highcharts}
        options={layoutChartOptions}
    />

    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="x | y"
    />
    <HighchartsReact 
        highcharts={Highcharts}
        options={offsetChartOptions}
    />
  </div>
)

export default BarGraphLegendPosition