import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: 'Business Technology',
    id: 1,
  }, {
    name: 'Development',
    parent: 1,
    value: 80,
  }, {
    name: 'Support',
    parent: 1,
    value: 40,
  }, {
    name: "Leadership",
    parent: 1,
    value: 10,
  }
]

const TreemapChartDefault = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        id="bar-default"
        title="Department Headcounts"
        {...props}
    />
  </div>
)

export default TreemapChartDefault
