import React from "react";
import { PbCircleChart } from "playbook-ui";

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


const PbCircleChartRounded = (props) => {
const chartOptions = {
    series: [{ data: data }],
    plotOptions: {
      pie: {
        borderColor: null,
        borderWidth: 20,
        innerSize: '100%',
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
};

export default PbCircleChartRounded;