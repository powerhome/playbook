import React from 'react'
import circleChartTheme from '../circleChartTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import Title from '../../pb_title/_title'

const dataWithABlock = [
  {
    name: 'Waiting for Calls',
    y: 41,
  },
  {
    name: 'On Call',
    y: 49,
  },
  {
    name: 'After Call',
    y: 10,
  },
]

const CircleChartBlock = (props) => {
  const chartOptions = {
    series: [{ 
      data: dataWithABlock,
      innerSize: '100%',
      borderWidth: 20,
      borderColor: null,
    }],
  }

  const options = Highcharts.merge({}, circleChartTheme, chartOptions, {
    chart: {
      events: {
        render: function() {
          const chart = this;
          const blockElement = document.querySelector('.pb-circle-chart-block');
          if (blockElement) {
            blockElement.style.width = chart.chartWidth + 'px';
            blockElement.style.height = chart.chartHeight + 'px';
          }
        },
        redraw: function() {
          const chart = this;
          const blockElement = document.querySelector('.pb-circle-chart-block');
          if (blockElement) {
            blockElement.style.width = chart.chartWidth + 'px';
            blockElement.style.height = chart.chartHeight + 'px';
          }
        }
      }
    }
  })

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
        <div 
            className="pb-circle-chart-block"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              textAlign: 'center',
              pointerEvents: 'none'
          }}
        >
          <Title
              size={1}
              tag="div"
              {...props}
          >
            {'83'}
          </Title>
        </div>
      </div>
    </div>
  )
}

export default CircleChartBlock