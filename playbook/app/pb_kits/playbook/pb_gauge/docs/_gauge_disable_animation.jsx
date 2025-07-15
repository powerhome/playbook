import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Participants", y: 84 }]

const baseOptions = {
  series: [{ data: data }],
  plotOptions: {
    series: {
      animation: false,
    },
  },
};

const GaugeDisableAnimation = () => {
  const options = Highcharts.merge({}, gaugeTheme, baseOptions);

  return (
    <div>
      <HighchartsReact
          disableAnimation
          highcharts={Highcharts}
          options={options}
      />
    </div>
  );
};

export default GaugeDisableAnimation;
