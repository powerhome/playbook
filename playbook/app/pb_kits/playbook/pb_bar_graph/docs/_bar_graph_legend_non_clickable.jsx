import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../BarGraphStyles.scss";
// Your path might look more like this
//import "playbook-ui/dist/pb_bar_graph/BarGraphStyles.scss";

const chartData = [{
  name: 'Number of Installations',
  data: [1475, 200, 3000, 654, 656],
}]

const chartOptions = {
  chart: {
    type: 'column',
  },
  series: chartData,
  title: {
    text: 'Solar Employment Growth by Sector, 2010-2016',
  },
  subtitle: {
    text: 'Source: thesolarfoundation.com',
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Employees',
    },
  },
  legend: { enabled: true ,
    events: {
      itemClick: function () {
        return false;
      }
  }
  },
  credits: { enabled: false },
}

const BarGraphLegendNonClickable = () => (

  <div>
    <HighchartsReact 
        highcharts={Highcharts}
        options={chartOptions}
    />
  </div>
)

export default BarGraphLegendNonClickable
