import React from 'react'
import { Gauge } from '../../'

const chartData1 = [
  { name: 'Data Used', value: 32 },
]
const chartData2 = [
  { name: 'Sales to Date', value: 65 },
]

const GaugeUnits = () => (
  <div>
    <Gauge
        chartData={chartData1}
        id="gauge-units1"
        title="Data Usage"
        units="{y}GB"
    />
    <Gauge
        chartData={chartData2}
        id="gauge-units2"
        title="Sales Goal"
        units="${y}k"
    />
  </div>
)

export default GaugeUnits
