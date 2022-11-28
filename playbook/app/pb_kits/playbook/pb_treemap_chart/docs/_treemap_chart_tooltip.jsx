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

const TreemapChartTooltip = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        id="treemap-tooltip"
        title="Favored Pizza Toppings"
        tooltipHtml={function () {return `<p>Custom tooltip for ${this.point.name} <br/>with value: ${this.point.value}</p>`}}
        {...props}
    />
  </div>
)

export default TreemapChartTooltip
