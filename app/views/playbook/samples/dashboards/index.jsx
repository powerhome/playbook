import React from 'react'
import { BarGraph } from '../../../../pb_kits/playbook'

const chartData = [
  {
    name: 'Installation',
    data: [154175],
  },
  {
    name: 'Manufacturing',
    data: [40434],
  },
  {
    name: 'Sales & Distribution',
    data: [39387],
  },
  {
    name: 'Project Development',
    data: [34227],
  },
  {
    name: 'Other',
    data: [18111],
  },
]

const Dashboards = () => (
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

export default Dashboards
