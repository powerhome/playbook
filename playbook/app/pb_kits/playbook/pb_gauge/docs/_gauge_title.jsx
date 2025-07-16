import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Score", y: 780 }]

const baseOptions = {
  title: {
    text: "Credit Score",
  },
  yAxis: {
    min: 300,
    max: 850,
  },
  series: [{ data: data }],
};

const GaugeTitle = () => {
  const options = Highcharts.merge({}, gaugeTheme, baseOptions);

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          id="gauge-title"
          options={options}
      />
    </div>
  );
};

export default GaugeTitle;
