import React from "react";
import PbCircleChart from "../_pb_circle_chart";

const data = [
  {
    name: "EV",
    y: 23.9,
  },
  {
    name: "Hybrids",
    y: 12.6,
  },
  {
    name: "Diesel",
    y: 37.0,
  },
  {
    name: "Petrol",
    y: 26.4,
  },
];

const total = data.reduce((sum, point) => sum + point.y, 0);
const subtitleRows = data.map((point) => `${point.name}: ${point.y}%`).join("<br>");

const chartOptions = {
  chart: {
    type: "pie",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  title: {
    text: "2023 Norway car registrations",
    floating: true,
    align: "center",
    verticalAlign: "top",
    y: 8,
  },
  subtitle: {
    text: `Total<br><strong>${total.toFixed(1)}</strong><br><br>${subtitleRows}`,
    useHTML: true,
    floating: true,
    align: "center",
    verticalAlign: "middle",
    y: 8,
    style: {
      textAlign: "center",
    },
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.0f}%</b>",
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      borderRadius: 8,
      dataLabels: [
        {
          enabled: true,
          distance: 20,
          format: "{point.name}",
        },
        {
          enabled: true,
          distance: -15,
          format: "{point.percentage:.0f}%",
          style: {
            fontSize: "0.9em",
          },
        },
      ],
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Registrations",
      colorByPoint: true,
      center: ["50%", "50%"],
      innerSize: "75%",
      data,
    },
  ],
};

const PbCircleChartCenteredData = (props) => (
  <PbCircleChart
      options={chartOptions}
      {...props}
  />
);

export default PbCircleChartCenteredData;
