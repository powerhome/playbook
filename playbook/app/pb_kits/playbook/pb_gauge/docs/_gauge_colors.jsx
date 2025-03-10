import React from 'react'
import Gauge from '../../pb_gauge/_gauge'

const data = [
  { name: 'Name', value: 67 },
]

const GaugeColors = (props) => (
  <div>
    <Gauge
        chartData={data}
        id="gauge-colors"
        {...props}
        colors={['data-7']}
    />
  </div>
)

export default GaugeColors
