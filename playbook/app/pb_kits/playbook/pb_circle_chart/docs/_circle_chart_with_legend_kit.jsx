import React from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const dataWithLegend = [{
  name: 'Bugs',
  y: 8,
},
{
  name: 'Chores',
  y: 1,
},
{
  name: 'Stories',
  y: 12,
}]

const CircleChartWithLegendKit = () => {
  const chartOptions = {
    series: [{ data: dataWithLegend }],
    plotOptions: {
      pie: {
        showInLegend: true
      }
    }
  }

  const options = Highcharts.merge({}, circleChartTheme, chartOptions)

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </div>
  )
}

export default CircleChartWithLegendKit