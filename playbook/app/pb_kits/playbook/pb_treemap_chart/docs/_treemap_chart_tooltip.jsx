import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: 'Revenue',
    parent: "Business Units",
    value: 1770,
  }, {
    name: 'Project Services',
    parent: "Business Units",
    value: 359,
  }, {
    name: 'Contact Center',
    parent: "Business Units",
    value: 186,
  },{
    name: "Business Technology",
    parent: "Business Units",
    value: 161,
  }, {
    name: 'People',
    parent: "Business Units",
    value: 104,
  }, {
    name: "Installation Services",
    parent: "Business Units",
    value: 46,
  }, {
    name: "Business Units",
    id: "Business Units",
  },
]

const TreemapChartTooltip = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        id="treemap-tooltip"
        title="Business Unit Headcounts"
        tooltipHtml={"<p>Custom tooltip for {point.name} <br/>with value: {point.value}</p>"}
        useHtml
        {...props}
    />
  </div>
)

export default TreemapChartTooltip
