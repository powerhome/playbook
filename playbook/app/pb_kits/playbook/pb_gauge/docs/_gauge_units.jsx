import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data1 = [
  { name: 'Data Used', y: 32 },
]
const data2 = [
  { name: 'Sales to Date', y: 65 },
]

const baseOptions1 = {
  title: {
    text: "Data Usage",
  },
  series: [{ data: data1 }],
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span class="fix">{y:,f}</span>` +
          `<span class="pb-gauge-suffix">GB</span>`,
      },
    },
  },
};
const baseOptions2 = {
  title: {
    text: "Sales Goal",
  },
  series: [{ data: data2 }],
  plotOptions: {
    solidgauge: {
      dataLabels: {
        format:
          `<span class="pb-gauge-prefix" y="28">$</span>` +
          `<span class="fix" y="38">{y:,f}</span>` +
          `<span class="pb-gauge-suffix">k</span>`,
      },
    },
  },
};

const GaugeUnits = () => {
  const options1 = Highcharts.merge({}, gaugeTheme, baseOptions1);
  const options2 = Highcharts.merge({}, gaugeTheme, baseOptions2);

  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          id="gauge-units1"
          options={options1}
      />
      <HighchartsReact
          highcharts={Highcharts}
          id="gauge-units2"
          options={options2}
      />
    </div>
  );
};

export default GaugeUnits;
