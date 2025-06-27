import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import barGraphTheme from '../barGraphTheme';

const chartOptions = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Historic World Population by Region',
        align: 'left'
    },
    subtitle: {
        text: 'Source: <a ' +
            'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
            'target="_blank">Wikipedia.org</a>',
        align: 'left'
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        lineWidth: 0
    },
    yAxis: {
        title: {
            text: '',
        },
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    series: [{
        name: 'Year 1990',
        data: [631, 727, 3202, 721]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
    }, {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746]
    }],
}

const options = Highcharts.merge({}, barGraphTheme, chartOptions)

const BarGraphHorizontal = () => (
  <div>
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
  </div>
)

export default BarGraphHorizontal