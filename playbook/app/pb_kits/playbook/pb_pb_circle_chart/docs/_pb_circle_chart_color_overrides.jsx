import React from "react";
import PbCircleChart from "../_pb_circle_chart";
import colors from '../../tokens/exports/_colors.module.scss';

const data= [
        {
          name: "Waiting for Calls",
          y: 41,
        },
        {
          name: "On Call",
          y: 49,
        },
        {
          name: "After Call",
          y: 10,
        },
      ]


const PbCircleChartColorOverrides = (props) => {
const chartOptions = {
    series: [{ data: data }],
    plotOptions: {
      pie: {
        colors: ["#144075", colors.data_4, colors.data_2], // Custom colors via hex OR Playbook color tokens
      },
    },
  };

  return (
  <div>
    <PbCircleChart
        options={chartOptions}
        {...props}
    />
  </div>
);
}

export default PbCircleChartColorOverrides;
