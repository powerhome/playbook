import React from 'react'
import Gauge from '../../pb_gauge/_gauge'

const data = [
  { name: 'Capacity', value: 75 },
]

const GaugeFullCircle = (props) => (
  <div>
    <Gauge
        chartData={data}
        fullCircle
        id="gauge-full-circle"
        suffix="%"
        title="Seating Capacity"
        {...props}
    />
  </div>
)

export default GaugeFullCircle
