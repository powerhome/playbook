import React from 'react'

import BarGraph from '../_bar_graph'

const chartData = [{
  name: 'Number of Brownies',
  data: [-475, -400, -1000, -354, -856],
}, {
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}, 
{
  name: 'Number of Cookies',
  data: [1270, 100, 2000, 554, 756],
}, {
  type: 'spline',
  name: 'Trend Line',
  data: [1975, 600, 2500, 924, 500],
  color: '#F9BB00',
}]


const BarGraphDefault = (props) => (
  <div>
    <BarGraph
        axisTitle="Number of Employees"
        chartData={chartData}
        id="bar-default"
        stacking= "true"
        subTitle="Source: thesolarfoundation.com"
        title="Solar Employment Growth by Sector, 2010-2016"
        xAxisCategories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
        yAxisMin={0}
        {...props}
    />
  </div>
)

export default BarGraphDefault
