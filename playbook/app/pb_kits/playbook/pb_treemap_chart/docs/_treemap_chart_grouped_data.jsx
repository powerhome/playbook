import React from 'react'

import TreemapChart from '../_treemap_chart'

const chartData = [
  {
    name: 'Meat',
    id: 'Meat',
    color: "#0056CF",
  }, {
    name: 'Pepperoni',
    parent: 'Meat',
    value: 250,
  }, {
    name: 'Meatball',
    parent: 'Meat',
    value: 400,
  }, {
    name: "Anchovy",
    parent: 'Meat',
    value: 40,
  }, {
    name: 'Vegetarian',
    id: 'Vegetarian',
    color: "#F9BB00",
  }, {
    name: 'Onions',
    parent: 'Vegetarian',
    value: 300,
  }, {
    name: 'Pineapple',
    parent: 'Vegetarian',
    value: 90,
  }, {
    name: "Peppers",
    parent: 'Vegetarian',
    value: 80,
  }, {
    name: "Specialty",
    id: "Specialty",
    color: "#9E64E9",
  },{
    name: "Buffalo Chicken",
    parent: "Specialty",
    value: 400,
  }, {
    name: "Supreme",
    parent: "Specialty",
    value: 150,
  }
]

const TreemapChartGroupedData = (props) => (
  <div>
    <TreemapChart
        chartData={chartData}
        grouped
        id="treemap-grouped-data"
        title="Grouped Toppings"
        {...props}
    />
  </div>
)

export default TreemapChartGroupedData
