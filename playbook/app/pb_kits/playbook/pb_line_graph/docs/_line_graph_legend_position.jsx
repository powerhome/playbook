import React from 'react'
import { LineGraph, Title } from '../..'

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

const LineGraphLegendPosition = (props) => (
  <div>
    <Title
        paddingBottom="sm"
        paddingTop="sm"
        size={4}
        tag="h4"
        text="align | verticalAlign"
    />
    <LineGraph
        align='right'
        axisTitle="Number of Employees"
        chartData={data}
        id="legend-position"
        legend
        title="Horizontal and Vertical Alignment of Legend"
        verticalAlign="top"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
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
    <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        id="legend-position-1"
        layout="vertical"
        legend
        title="Layout of Legend Items"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
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
    <LineGraph
        axisTitle="Number of Employees"
        chartData={data}
        id="legend-position-2"
        layout="vertical"
        legend
        title="X and Y Offset of Legend"
        x={100}
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
        y={10}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default LineGraphLegendPosition