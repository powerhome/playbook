import React from "react";
import PbCircleChart from "../_pb_circle_chart";

const data = [{
  name: 'Bugs',
  y: 8,
},
{
  name: 'Chores',
  y: 1,
},
{
  name: 'Stories',
  y: 12,
}]


const PbCircleChartDataWithLegend = (props) => {
const chartOptions = {
  series: [{ data: data }],
  plotOptions: {
    pie: {
      showInLegend: true,
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

export default PbCircleChartDataWithLegend;
