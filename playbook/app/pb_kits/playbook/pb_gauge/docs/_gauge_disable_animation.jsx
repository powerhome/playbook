import React from 'react'
import Gauge from '../../pb_gauge/_gauge'

const data = [
  { name: 'Participants', value: 84 },
]

const GaugeDisableAnimation = (props) => (
  <div>
    <Gauge
        chartData={data}
        disableAnimation
        id="gauge-disable-animation"
        {...props}
    />
  </div>
)

export default GaugeDisableAnimation
