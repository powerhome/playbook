import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: 'Revenue',
    value: 1770,
  }, {
    name: 'Project Services',
    value: 359,
  }, {
    name: 'Contact Center',
    value: 186,
  },{
    name: "Business Technology",
    value: 161,
  }, {
    name: 'People',
    value: 104,
  }, {
    name: "Installation Services",
    value: 46,
  }
]

const TreemapChartDefault = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        id="treemap-default"
        title="Business Unit Headcounts"
        {...props}
    />
  </div>
)

export default TreemapChartDefault
