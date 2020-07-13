import React, { useState } from 'react'
import { Button, Gauge } from '../../'

const GaugeLiveData = () => {

  const [value, setValue] = useState(50)

  const updateState = () => {
    // set value state to random number between 1-100
    setValue(Math.floor(Math.random() * 100))
  }

  return (
    <div>
      <Button
          onClick={updateState}
          text="Update State"
      />
      <Gauge
          chartData={[{ name: 'Name', value: value }]}
          id="gauge-live-data"
      />
    </div>
  )
}

export default GaugeLiveData
