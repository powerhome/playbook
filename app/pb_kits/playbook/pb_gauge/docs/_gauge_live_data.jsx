import React, { useState } from 'react'
import { Button, Gauge } from '../../'

const GaugeLiveData = () => {

  const [value, setValue] = useState(50)
  // let yourChart

  // useEffect(() => {

  //   // Store array of pages' Highchart objects in variable 'charts'
  //   // Must import `Highcharts` for this method call
  //   const charts = Highcharts.charts

  //   // Loop through array to find the chart with the id you passed as prop below
  //   charts.forEach((chart) => {
  //     if (chart.renderTo.id === 'gauge-live-data') {
  //       yourChart = chart
  //     }
  //   })

  //   // window['gauge-live-data'].series[0].setData([value])


  //   // Set new data value for your chart sourced by React component state
  //   // Uses Highcharts api method `.setData`
  //   // React state value must be passed in as an Array, i.e. `[value]`
  //   yourChart.series[0].setData([value])
  //   console.log(Highcharts.charts)
  // })

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
