import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: "Evergreen",
    id: "Evergreen",
    color: "#0056CF",
  }, {
    name: "Pine",
    id: "Pine",
    parent: "Evergreen",
    value: 300,
    color: "#477BC4",
  }, {
    name: "Ponderosa Pine",
    parent: "Pine",
    value: 50,
  }, {
    name: "Scots Pine",
    parent: "Pine",
    value: 150,
  }, {
    name: "White Pine",
    parent: "Pine",
    value: 100,
  }, {
    name: "Douglas Fir",
    parent: "Evergreen",
    value: 150,
  }, {
    name: "Juniper",
    parent: "Evergreen",
    value: 80,
  }, {
    name: "Hemlock",
    parent: "Evergreen",
    value: 30,
  }, {
    name: "Deciduous",
    id: "Deciduous",
    color: "#F9BB00",
  }, {
    name: "Oak",
    parent: "Deciduous",
    value: 80,
  }, {
    name: "Maple",
    id: "Maple",
    parent: "Deciduous",
    value: 180,
    color: "#F7CE52",
  }, {
    name: "Red Maple",
    parent: "Maple",
    value: 80,
  }, {
    name: "Sugar Maple",
    parent: "Maple",
    value: 100,
  }, {
    name: "Beech",
    parent: "Deciduous",
    value: 50,
  }, {
    name: "Willow",
    parent: "Deciduous",
    value: 100,
  }, {
    name: "Juniper",
    parent: "Deciduous",
    value: 90,
  },
]

const TreemapChartDrillable = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        drillable
        grouped
        id="treemap-drillable"
        title="Drillable Grouped Tree Species"
        {...props}
    />
  </div>
)

export default TreemapChartDrillable
