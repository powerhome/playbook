import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: 'Customer Development',
    id: 'CD',
    color: "#0056CF",
  }, {
    name: 'Contact Center',
    parent: 'CD',
    id: "Contact Center",
    value: 300,
  }, {
    name: "Inside Sales",
    parent: "Contact Center",
    value: 200,
  }, {
    name: "Scheduling",
    parent: "Contact Center",
    value: 100,
  }, {
    name: 'Field',
    parent: 'CD',
    value: 500,
  }, {
    name: "Leadership",
    parent: 'CD',
    value: 40,
  }, {
    name: 'Business Technology',
    id: 'BT',
    color: "#F9BB00",
  }, {
    name: 'Development',
    parent: 'BT',
    value: 180,
  }, {
    name: 'Support',
    parent: 'BT',
    value: 40,
  }, {
    name: "Leadership",
    parent: 'BT',
    value: 15,
  }, {
    name: "Sales",
    id: "Sales",
    color: "#9E64E9",
  },{
    name: "Remodeling Consultant",
    parent: "Sales",
    value: 400,
  }, {
    name: "Quality Assurance",
    parent: "Sales",
    value: 50,
  }
]

const TreemapChartDrillable = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        drillable
        grouped
        id="treemap-drillable"
        title="Drillable Grouped Headcounts"
        {...props}
    />
  </div>
)

export default TreemapChartDrillable
