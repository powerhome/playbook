import React from 'react'
import PbBarGraph from '../_pb_bar_graph'
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

const PbBarGraphLegendPosition = () => {

  return (
  <div>
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="align | verticalAlign"
    />
    <PbBarGraph 
        options={alignChartOptions}
    />

    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="layout"
    />
    <PbBarGraph 
        options={layoutChartOptions}
    />

    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="x | y"
    />
    <PbBarGraph 
        options={offsetChartOptions}
    />
  </div>
)
}

export default PbBarGraphLegendPosition
