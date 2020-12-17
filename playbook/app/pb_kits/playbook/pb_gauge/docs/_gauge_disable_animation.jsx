import React from 'react'
import { Gauge } from '../../'

const data = [
  { name: 'Participants', value: 84 },
]

const GaugeDisableAnimation = () => (
  <div>
    <Gauge
        chartData={data}
        disableAnimation
        id="gauge-disable-animation"
    />
  </div>
)

export default GaugeDisableAnimation
