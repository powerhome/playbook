import React, { useState, useRef } from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import Button from '../../pb_button/_button'

const PbGaugeChartLiveData = (props) => {
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

  const chartOptions = {
    title: {
      text: name,
    },
    series: [{
      data: [{ name: name, y: value }]
    }]
  }
  return (
    <div>
      <Button
          onClick={updateValue}
          text="Update Value"
        />
        <Button
            onClick={updateName}
            text="Update Name"
        />
      <PbGaugeChart
          options={chartOptions}
          ref={chartRef}
          {...props}
      />
    </div>
  );
}

export default PbGaugeChartLiveData
