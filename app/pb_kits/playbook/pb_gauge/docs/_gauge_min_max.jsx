import React from 'react'
import { Gauge } from '../../'

const chartData = [{
  name: 'Name', value: 8,
}]

const GaugeMinMax = () => (
  <div>
    <Gauge
        chartData={chartData}
        id="gauge-min-max"
        max={10}
        min={0}
        showLabels
    />
  </div>
)

export default GaugeMinMax
