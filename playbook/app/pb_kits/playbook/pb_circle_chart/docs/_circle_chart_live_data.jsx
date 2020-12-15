import React, { useState } from 'react'
import { Button, CircleChart } from '../../'

const CircleChartLiveData = (props) => {
  const [data, setData] = useState([
    {
      name: 'Waiting for Calls',
      value: 41,
    },
    {
      name: 'On Call',
      value: 49,
    },
    {
      name: 'After call',
      value: 10,
    },
  ])

  const data2 = [
    {
      name: 'Waiting for Calls',
      value: 48,
    },
    {
      name: 'On Call',
      value: 12,
    },
    {
      name: 'After call',
      value: 140,
    },
  ]

  const updateValue = () => {
    setData(data2)
  }

  return (
    <div>
      <Button
          {...props}
          onClick={updateValue}
          text="Update Value"
      />
      <CircleChart
          {...props}
          chartData={data}
          id="circle-chart-live-data"
      />
    </div>
  )
}

export default CircleChartLiveData
