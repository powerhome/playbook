import React from "react";
import PbCircleChart from "../_pb_circle_chart";

const data= [
{
    name: 'Facebook',
    y: 2498,
  },
  {
    name: 'YouTube',
    y: 2000,
  },
  {
    name: 'WhatsApp',
    y: 2000,
  },
  {
    name: 'Facebook Messenger',
    y: 1300,
  },
  {
    name: 'WeChat',
    y: 1165,
  },
  {
    name: 'Instagram',
    y: 1000,
  },
  {
    name: 'Tik Tok',
    y: 800,
  },
]


const PbCircleChartWithTitle = (props) => {
const chartOptions = {
    title: { text: "Active Users on Social Media" },
    series: [{ data: data }],
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

export default PbCircleChartWithTitle;