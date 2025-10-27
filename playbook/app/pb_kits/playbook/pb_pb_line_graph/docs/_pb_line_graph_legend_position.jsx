import React from 'react'
import PbLineGraph from '../../pb_pb_line_graph/_pb_line_graph'
import Title from '../../pb_title/_title'

const data = [{
  name: 'Installation',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}, {
  name: 'Manufacturing',
  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
}, {
  name: 'Sales & Distribution',
  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
}, {
  name: 'Project Development',
  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
}, {
  name: 'Other',
  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
}]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

  const chartOptionsFirst = {
    title: { text: "Alignment of Legend" },
    series: data,
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Employees",
      },
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'top'
    },
  }

  const chartOptionsSecond = {
    title: { text: "Layout of Legend" },
    series: data,
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Employees",
      },
    },
    legend: {
      enabled: true,
      layout: 'vertical'
    },
  }

  const chartOptionsThird = {
    title: { text: "Offset of Legend" },
    series: data,
    xAxis: {
      categories: categories,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Employees",
      },
    },
    legend: {
      enabled: true,
      layout: 'vertical',
      x: 100,
      y: 10
    },
  }

const PbLineGraphLegendPosition = (props) => (
  <div>
    <Title
        paddingY="sm"
        size={4}
        tag="h4"
        text="align | verticalAlign"
    />
    <PbLineGraph
        options={chartOptionsFirst}
        {...props}
    /> 
    <Title
        paddingY="sm"
        size={4}
        tag="h4"
        text="layout"
    />
    <PbLineGraph
        options={chartOptionsSecond}
        {...props}
    /> 
    <Title
        paddingY="sm"
        size={4}
        tag="h4"
        text="x | y"
    />
    <PbLineGraph
        options={chartOptionsThird}
        {...props}
    />
  </div>
)

export default PbLineGraphLegendPosition
