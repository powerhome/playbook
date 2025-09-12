import React from "react";
import { PbCircleChart } from "playbook-ui";

const data = [
  {
    name: 'Waiting for Calls',
    y: 41,
  },
  {
    name: 'On Call',
    y: 49,
  },
  {
    name: 'After Call',
    y: 10,
  },
]

const PbCircleChartCustomTooltip = (props) => {
const chartOptions = {
    series: [{ data: data }],
    tooltip: {
      headerFormat: null,
      pointFormat: '<p>Custom tooltip for {point.name} <br/>with value: {point.y}</p>',
      useHTML: true,
    },
  }

  return (
    <div>
      <PbCircleChart
          options={chartOptions}
          {...props}
      />
    </div>
  );
};

export default PbCircleChartCustomTooltip;