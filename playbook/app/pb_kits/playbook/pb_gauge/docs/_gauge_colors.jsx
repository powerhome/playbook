import React from 'react'
import { Gauge } from '../../'

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
