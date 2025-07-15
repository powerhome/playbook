import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Capacity", y: 75 }]

const baseOptions = {
  title: {
    text: "Seating Capacity",
  },
  series: [{ data: data }],
  pane: {
    startAngle: 0,
    endAngle: 360,
  },
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span class="fix">{y:,f}</span>` +
          `<span class="pb-gauge-suffix">%</span>`,
      },
    },
  },
};

const GaugeFullCircle = () => {
  const options = Highcharts.merge({}, gaugeTheme, baseOptions);

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          id="gauge-full-circle"
          options={options}
      />
    </div>
  );
};

export default GaugeFullCircle;
