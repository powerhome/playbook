import React from "react";
import PbCircleChart from "../_pb_circle_chart";

const chartOptions = {
  series: [
    {
      data: [
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
      ],
    },
  ],
};
const PbCircleChartDefault = (props) => (
  <div>
    <PbCircleChart
        options={chartOptions}
        {...props}
    />
  </div>
);

export default PbCircleChartDefault;
