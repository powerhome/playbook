import React from 'react'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"
import '../GaugeStyles.scss'
// Your path might look more like this
//import "playbook-ui/dist/pb_gauge/GaugeStyles.scss";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Name", y: 45 }]

const baseOptions = {
  chart: { type: "solidgauge" },
  title: { text: "" },
  series: [{ data: data }],
};

const GaugePbStyles = () => {
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

export default GaugePbStyles;
