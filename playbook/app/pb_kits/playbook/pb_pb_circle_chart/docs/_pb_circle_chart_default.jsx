import React from "react";
import PbCircleChart from "../_pb_circle_chart";
import Body from "../../pb_body/_body";
import Title from "../../pb_title/_title";

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
  },
  subtitle: {
    text: 'Source: <a href="https://www.ssb.no/transport-og-reiseliv/faktaside/bil-og-transport">SSB</a>',
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
      innerSize: "75%",
      data,
    },
  ],
};

const PbCircleChartDefault = (props) => (
  <div style={{ position: "relative" }}>
    <PbCircleChart
        options={chartOptions}
        {...props}
    />
    <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          textAlign: "center",
          pointerEvents: "none",
        }}
    >
      <div>
        <Body
            color="light"
            text="Total"
        />
        <Title
            size={3}
            tag="div"
        >
          {total.toFixed(1)}
        </Title>
      </div>
    </div>
  </div>
);

export default PbCircleChartDefault;
