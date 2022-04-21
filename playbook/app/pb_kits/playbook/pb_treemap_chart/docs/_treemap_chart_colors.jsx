import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: "Business Units",
    id: "Business Units",
  }, {
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
  }
]

const TreemapChartColors = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        colors={["data-7", "data-4", "#124732", "#8E6E53"]}
        id="treemap-colors"
        title="Business Unit Headcounts"
        {...props}
    />
  </div>
)

export default TreemapChartColors
