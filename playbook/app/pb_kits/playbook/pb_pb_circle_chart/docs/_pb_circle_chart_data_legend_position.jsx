import React from "react";
import PbCircleChart from "../_pb_circle_chart";
import Title from "../../pb_title/_title";

const dataFirst = [
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

const dataSecond = [{
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

const dataThird = [
  {
    name: 'Queued',
    y: 7,
  },
  {
    name: 'In Progress',
    y: 6,
  },
  {
    name: 'Validation',
    y: 3,
  },
  {
    name: 'Done',
    y: 6,
  },
]


const PbCircleChartDataLegendPosition = (props) => {
const chartOptionsFirst = {
    title: { text: "Alignment of Legend" },
    series: [{ data: dataFirst }],
    legend: {
      align: 'right',
      verticalAlign: 'top'
    },
    plotOptions: {
      pie: {
        showInLegend: true
      }
    }
  }

  const chartOptionsSecond = {
    title: { text: "Layout of Legend" },
    series: [{ data: dataSecond }],
    legend: {
      layout: 'vertical'
    },
    plotOptions: {
      pie: {
        showInLegend: true
      }
    }
  }

  const chartOptionsThird = {
    title: { text: "Offset of Legend" },
    series: [{ data: dataThird }],
    legend: {
      layout: 'vertical',
      x: 100,
      y: 10
    },
    plotOptions: {
      pie: {
        showInLegend: true
      }
    }
  }

  return (
  <div>
    <Title
        paddingY="sm"
        size={4}
        tag="h4"
        text="align | verticalAlign"
    />
    <PbCircleChart
        options={chartOptionsFirst}
        {...props}
    /> 
    <Title
        paddingY="sm"
        size={4}
        tag="h4"
        text="layout"
    />
    <PbCircleChart
        options={chartOptionsSecond}
        {...props}
    />
    <Title
        paddingY="sm"
        size={4}
        tag="h4"
        text="x | y"
    />
    <PbCircleChart
        options={chartOptionsThird}
        {...props}
    />
  </div>
);
}

export default PbCircleChartDataLegendPosition;
