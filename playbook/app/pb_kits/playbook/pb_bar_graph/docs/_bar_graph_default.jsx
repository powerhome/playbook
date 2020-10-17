import React from 'react'
import { BarGraph } from '../../'

const chartData = [{
  name: 'Installation',
  data: [1475, 200, 3000, 654, 656],
}, {
  name: 'Manufacturing',
  data: [4434, 524, 2320, 440, 500],
}, {
  name: 'Sales & Distribution',
  data: [3387, 743, 1344, 434, 440],
}, {
  name: 'Project Development',
  data: [3227, 878, 999, 780, 1000],
}, {
  name: 'Other',
  data: [1111, 677, 3245, 500, 200],
}]

const BarGraphDefault = () => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="bar-default"
        subTitle="Source: thesolarfoundation.com"
        title="Solar Employment Growth by Sector, 2010-2016"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
    />
  </div>
)

export default BarGraphDefault
