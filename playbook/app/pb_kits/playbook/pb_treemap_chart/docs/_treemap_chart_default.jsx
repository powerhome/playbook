import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: "Pepperoni",
    parent: "Toppings",
    value: 600,
  }, {
    name: "Cheese",
    parent: "Toppings",
    value: 510,
  }, {
    name: "Mushroom",
    parent: "Toppings",
    value: 330,
  },{
    name: "Onions",
    parent: "Toppings",
    value: 250,
  }, {
    name: "Olives",
    parent: "Toppings",
    value: 204,
  }, {
    name: "Pineapple",
    parent: "Toppings",
    value: 90,
  }, {
    name: "Pizza Toppings",
    id: "Toppings",
  },
]

const TreemapChartDefault = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        id="treemap-default"
        title="Favored Pizza Toppings"
        {...props}
    />
  </div>
)

export default TreemapChartDefault
