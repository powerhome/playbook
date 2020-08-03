import React from 'react'
import { Gauge } from '../../'

const data = [
  { name: 'Point1', value: 45 },
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
