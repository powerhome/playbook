import React from 'react'
import { BarGraph, Title } from '../..'

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

const BarGraphLegendPosition = (props) => (
  <div>
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="align | verticalAlign"
    />
    <BarGraph
        align='right'
        axisTitle="Number of Employees"
        chartData={chartData}
        id="legend-position-bar"
        legend
        paddingBottom="sm"
        title="Alignment of Legend"
        verticalAlign="top"
        xAxisCategories={['Jan']}
        yAxisMin={0}
        {...props}
    />
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="layout"
    />
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="legend-position-bar-1"
        layout="vertical"
        legend
        paddingBottom="sm"
        paddingTop="sm"
        title="Layout of Legend"
        xAxisCategories={['Jan']}
        yAxisMin={0}
        {...props}
    />
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="x | y"
    />
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="legend-position-bar-2"
        layout="vertical"
        legend
        title="Offset of Legend"
        x={100}
        xAxisCategories={['Jan']}
        y={10}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphLegendPosition