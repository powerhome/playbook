import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

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
      <HighchartsReact
          highcharts={Highcharts}
          options={Highcharts.merge({}, gaugeTheme, {
            series: [{ data: [{ name: name, y: value }] }],
          })}
      />
    </div>
  )
}

export default GaugeLiveData
