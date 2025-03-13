import React from 'react'
import ReactDOMServer from 'react-dom/server'
import BarGraph from '../_bar_graph'
import Icon from '../../pb_icon/_icon'

const chartData = [
  {
    name: 'Role',
    data: [0, 200, 300, 654, 656],
  },
  {
    name: 'Company',
    data: [150, 524, 320, 440, 500],
  },
]

const renderIcon = (iconName, color) => {
  return ReactDOMServer.renderToStaticMarkup(
  <Icon
      color={color}
      icon={iconName}
  />)
};

const barGraphOptions = {
  yAxis: {
    tickInterval: 10,
  },
  xAxis: {
    categories: ['1', '2', '3', '4', '5'],
    labels: {
      useHTML: true,
      formatter: function () {
        switch (this.value) {
          case '1':
            return `${renderIcon('frown', 'error')}`;
          case '2':
            return `${renderIcon('frown', 'warning')}`;
          case '3':
            return `${renderIcon('frown-open', 'neutral')}`;
          case '4':
            return `${renderIcon('smile', 'category_7')}`;
          case '5':
            return `${renderIcon('smile-beam', 'success')}`;
          default:
            return ''
        }
      },
      style: {
        fontSize: '1.4em',
      },
      y: 42,
    },
  },
  legend: {
    itemMarginTop: 62,
  },
}

const BarGraphCustom = () => (
  <div>
    <BarGraph
        chartData={chartData}
        customOptions={barGraphOptions}
        id="happiness-dashboard"
        legend
        title="Bar Graph with Custom Overrides"
    />
  </div>
)

export default BarGraphCustom
