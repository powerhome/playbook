import React, { useEffect, useRef, useState } from 'react'
import { Button, Gauge } from '../../'
// import Highcharts from 'highcharts'

const GaugeLiveData = () => {
  // let yourChart,
  //   gaugePoint,
  //   gaugeVal

  // useEffect(() => {
  //   // const charts = Highcharts.charts
  //   // charts.forEach((chart) => {
  //   //   if (chart.renderTo.id === 'gauge-live-data') {
  //   //     yourChart = chart
  //   //   }
  //   // })
  //   yourChart = window['gauge-live-data']
  //   gaugePoint = yourChart.series[0].points[0]
  //   // gaugeVal = gaugePoint.y

  //   // THIS LINE RIGHT HERE!!!!!!!!!!!!
  //   // Update Highchart val with React state everytime the state changes....
  //   let value = chartData[0].value
  //   gaugePoint.update(value)
  // })

  const [value, setValue] = useState(50)
  const refVal = useRef(50)

  useEffect(() => {
    window['gauge-live-data'].series[0].setData([value])
    // console.log(Highcharts.charts)
  })

  const mutateWithState = () => {
    setValue(Math.floor(Math.random() * 100))
    // window['gauge-live-data'].series[0].points[0].update(value)
    // window['gauge-live-data'].series[0].setData([value], false)
    // console.log(Highcharts.charts)
  }

  const mutateWithRef = () => {
    refVal.current = Math.floor(Math.random() * 100)
    window['gauge-live-data'].series[0].points[0].update(refVal.current)
    // console.log(Highcharts.charts)
  }

  // const memoizedGauge = useMemo(() => <Gauge chartData={[{ name: 'Name', value: 10 }]} id="gauge-live-data" />, [name, value])

  // const testMemo = React.memo(<Gauge chartData={[{ name: 'Name', value: 10 }]} id="gauge-live-data" />)

  return (
    <div>
      {/* <Button
          onClick={mutateChartData}
          text="Mutate Data"
      /> */}
      <Button
          onClick={mutateWithState}
          text="Change State"
      />
      <Button
          onClick={mutateWithRef}
          text="Change Ref"
      />
      <Gauge
          chartData={[{ name: 'Name', value: refVal.current }]}
          id="gauge-live-data"
      />
      {/* {testMemo} */}
      {/* {memoizedGauge} */}
    </div>
  )
}

export default GaugeLiveData
