import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"
import colors from '../../tokens/exports/_colors.module.scss'

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Name", y: 67 }]

const baseOptions = {
  series: [{ data: data }],
  plotOptions: {
    solidgauge: {
      borderColor: colors.data_7,
    }
  },
};

const GaugeColors = () => {
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

export default GaugeColors;
