import React, { useState } from "react";
import PbCircleChart from "../_pb_circle_chart";
import Button from "../../pb_button/_button";

const chartData = [
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
];

const chartData2 = [
  {
    name: "Waiting for Calls",
    y: 48,
  },
  {
    name: "On Call",
    y: 12,
  },
  {
    name: "After Call",
    y: 140,
  },
];


const PbCircleChartLiveData = (props) => {

  const [data, setData] = useState(chartData);

    const updateValue = () => {
    setData(chartData2)
  }
    const chartOptions = {
    series: [{ data: data }],
  }

  return (
    <div>
      <Button
          onClick={updateValue}
          text="Update Value"
      />
      <PbCircleChart
          options={chartOptions}
          {...props}
      />
    </div>
  );
};

export default PbCircleChartLiveData;
