import React from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const dataFirst = [
  {
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
  },
]

const dataSecond = [
  {
    name: 'Queued',
    y: 7,
  },
  {
    name: 'In Progress',
    y: 6,
  },
  {
    name: 'Validation',
    y: 3,
  },
  {
    name: 'Done',
    y: 6,
  },
]

const dataThird = [
  {
    name: '1 Point Tickets',
    y: 2,
  },
  {
    name: '3 Point Tickets',
    y: 5,
  },
  {
    name: '5 Point Tickets',
    y: 6,
  },
  {
    name: '8 Point Tickets',
    y: 3,
  },
  {
    name: '13 Point Tickets',
    y: 1,
  },
]

const dataFourth = [
  {
    name: 'Facebook',
    y: 2498,
  },
  {
    name: 'YouTube',
    y: 2000,
  },
  {
    name: 'WhatsApp',
    y: 2000,
  },
  {
    name: 'Facebook Messenger',
    y: 1300,
  },
  {
    name: 'WeChat',
    y: 1165,
  },
  {
    name: 'Instagram',
    y: 1000,
  },
  {
    name: 'Tik Tok',
    y: 800,
  },
]

const CircleChartInnerSizes = () => {
  const chartOptionsSmall = {
    series: [{ 
      data: dataFirst,
      innerSize: '35%'
    }],
  }

  const chartOptionsMedium = {
    series: [{ 
      data: dataSecond,
      innerSize: '50%'
    }],
  }

  const chartOptionsLarge = {
    series: [{ 
      data: dataThird,
      innerSize: '85%'
    }],
  }

  const chartOptionsNone = {
    series: [{ 
      data: dataFourth,
      innerSize: '0%'
    }],
  }

  const optionsSmall = Highcharts.merge({}, circleChartTheme, chartOptionsSmall)
  const optionsMedium = Highcharts.merge({}, circleChartTheme, chartOptionsMedium)
  const optionsLarge = Highcharts.merge({}, circleChartTheme, chartOptionsLarge)
  const optionsNone = Highcharts.merge({}, circleChartTheme, chartOptionsNone)

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={optionsSmall}
      />
      <HighchartsReact
          highcharts={Highcharts}
          options={optionsMedium}
      />
      <HighchartsReact
          highcharts={Highcharts}
          options={optionsLarge}
      />
      <div className="poop">
        <HighchartsReact
            highcharts={Highcharts}
            options={optionsNone}
        />
      </div>
    </div>
  )
}

export default CircleChartInnerSizes