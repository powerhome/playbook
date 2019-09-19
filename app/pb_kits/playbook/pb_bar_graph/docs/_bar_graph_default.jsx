import React from "react"
import BarGraph from "../_bar_graph.jsx"

const chartData = [{
  name: 'Installation',
  data: [154175]
}, {
  name: 'Manufacturing',
  data: [40434]
}, {
  name: 'Sales & Distribution',
  data: [39387]
}, {
  name: 'Project Development',
  data: [34227]
}, {
  name: 'Other',
  data: [18111]
}]

const BarGraphDefault = () => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="bar-test"
        pointStart={2012}
        subTitle="Source: thesolarfoundation.com"
        title="Solar Employment Growth by Sector, 2010-2016"
    />
  </div>
)

export default BarGraphDefault
