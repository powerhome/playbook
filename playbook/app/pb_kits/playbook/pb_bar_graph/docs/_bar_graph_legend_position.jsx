import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import Title from "../../pb_title/_title"

import { barGraphTheme } from "playbook-ui";

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
    title: {
      text: 'Number of Employees',
    },
  },
  legend: { 
    enabled: true,
    verticalAlign: 'top',
    align: 'right',
   },
}

const layoutChartOptions = {
  series: chartData,
  title: {
    text: 'Layout of Legend',
  },
  xAxis: {
    categories: ['Jan'],
  },
  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },
  legend: { 
    enabled: true,
    layout: 'vertical',
   },
}

const offsetChartOptions = {
  series: chartData,
  title: {
    text: 'Offset of Legend',
  },
  xAxis: {
    categories: ['Jan'],
  },
  yAxis: {
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
}

const BarGraphLegendPosition = () => {
  const alignOptions = Highcharts.merge({}, barGraphTheme, alignChartOptions)
  const layoutOptions = Highcharts.merge({}, barGraphTheme, layoutChartOptions)
  const offsetOptions = Highcharts.merge({}, barGraphTheme, offsetChartOptions)


  return (
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
        options={alignOptions}
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
        options={layoutOptions}
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
        options={offsetOptions}
    />
  </div>
)
}

export default BarGraphLegendPosition