import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Name", y: 45 }]

const baseOptions = {
  series: [{ data: data }],
};

const GaugeDefault = () => {
  const options = Highcharts.merge({}, gaugeTheme, baseOptions);

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={options}
      />
    </div>
  );
};

export default GaugeDefault;
