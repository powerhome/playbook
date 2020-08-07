import React from 'react'
import { Gauge } from '../../'

const data1 = [
  { name: 'Data Used', value: 32 },
]
const data2 = [
  { name: 'Sales to Date', value: 65 },
]

const GaugeUnits = () => (
  <div>
    <Gauge
        chartData={data1}
        id="gauge-units1"
        suffix="GB"
        title="Data Usage"
    />
    <Gauge
        chartData={data2}
        id="gauge-units2"
        prefix="$"
        suffix="k"
        title="Sales Goal"
    />
  </div>
)

export default GaugeUnits
