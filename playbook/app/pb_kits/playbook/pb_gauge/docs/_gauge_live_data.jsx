import React, { useState } from 'react'
import { Button, Gauge } from '../../'

const GaugeLiveData = (props) => {
  const [value, setValue] = useState(50)
  const [name, setName] = useState('Name')

  const updateValue = () => {
    setValue(Math.floor(Math.random() * 100))
  }
  const updateName = () => {
    let index = namesArray.indexOf(name)
    if (namesArray.indexOf(name) == 5) {
      index = 0
    } else {
      index += 1
    }
    setName(namesArray[index])
  }
  const namesArray = ['Name', 'Windows', 'Doors', 'Roofing', 'Siding', 'Gutters']

  return (
    <div>
      <Button
          onClick={updateValue}
          text="Update Value"
          {...props}
      />
      <Button
          onClick={updateName}
          text="Update Name"
          {...props}
      />
      <Gauge
          chartData={[{ name: name, value: value }]}
          id="gauge-live-data"
          {...props}
      />
    </div>
  )
}

export default GaugeLiveData
