import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const GaugeHeight = () => {
  return (
    <div>
      <HighchartsReact
          highcharts={Highcharts}
          options={Highcharts.merge({}, gaugeTheme, {
            title: {
              text: "Fixed Height in Pixels",
            },
            chart: {
              height: "400",
            },
            series: [{ data: [{ name: "Pixels", y: 400 }] }],
            plotOptions: {
              solidgauge: {
                dataLabels: {
                  format:
                    `<span class="fix">{y:,f}</span>` +
                    `<span class="pb-gauge-suffix">px</span>`,
                },
              },
            },
          })}
      />
      <HighchartsReact
          highcharts={Highcharts}
          options={Highcharts.merge({}, gaugeTheme, {
            title: {
              text: "Height as Percentage of Width",
            },
            chart: {
              height: "45%",
            },
            series: [{ data: [{ name: "Percentage", y: 45 }] }],
            plotOptions: {
              solidgauge: {
                dataLabels: {
                  format:
                    `<span class="fix">{y:,f}</span>` +
                    `<span class="pb-gauge-suffix">%</span>`,
                },
              },
            },
          })}
      />
    </div>
  );
};

export default GaugeHeight;
