import React, { useState, useRef } from 'react'
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
  const chartRef = useRef(null)

  const namesArray = ['Name', 'Windows', 'Doors', 'Roofing', 'Siding', 'Gutters']

  const updateValue = () => {
    const newValue = Math.floor(Math.random() * 100)
    setValue(newValue)

    const chart = chartRef.current?.chart
    if (chart) {
      chart.series[0].points[0].update(newValue)
    }
  }

  const updateName = () => {
    let index = namesArray.indexOf(name)
    if (namesArray.indexOf(name) == 5) {
      index = 0
    } else {
      index += 1
    }
    setName(namesArray[index])

    const chart = chartRef.current?.chart
    if (chart) {
      chart.series[0].points[0].update({ name: namesArray[index] })
    }
  }

  const options = Highcharts.merge({}, gaugeTheme,
    {
      title: {
        text: name,
      },
      series: [{
        data: [{ name: name, y: value }]
      }]
    }
  )

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
          options={options}
          ref={chartRef}
      />
    </div>
  )
}

export default GaugeLiveData
