import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"
import colors from '../../tokens/exports/_colors.module.scss'
import typography from '../../tokens/exports/_typography.module.scss'

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Rating", y: 4.5 }]

const baseOptions = {
  title: {
    text: "Product Rating",
  },
  yAxis: {
    min: 0,
    max: 5,
    lineWidth: 0,
    tickWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    tickPositions: [0, 5],
    labels: {
      y: 26,
      enabled: true,
      style: {
        color: colors.neutral,
        fontFamily: typography.font_family_base,
        fontWeight: typography.bold,
      }
    },
  },
  series: [{ data: data }],
};

const GaugeMinMax = () => {
  const options = Highcharts.merge({}, gaugeTheme, baseOptions);

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          id="gauge-min-max"
          options={options}
      />
    </div>
  );
};

export default GaugeMinMax;
