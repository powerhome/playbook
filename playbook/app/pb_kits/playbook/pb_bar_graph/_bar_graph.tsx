import React, { useState, useEffect } from "react";
import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps } from "../utilities/props";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";

import classnames from "classnames";

type BarGraphProps = {
  align?: "left" | "right" | "center";
  axisTitle: string;
  dark?: Boolean;
  xAxisCategories: [];
  yAxisMin: number;
  yAxisMax: number;
  chartData: { name: string; data: number[] }[];
  className?: string;
  id: any;
  pointStart: number | any;
  subTitle?: string;
  title: string;
  type?: string;
  legend?: boolean;
  toggleLegendClick?: boolean;
  height?: string;
  colors: string[];
  layout?: "horizontal" | "vertical" | "proximate";
  verticalAlign?: "top" | "middle" | "bottom";
  x?: number;
  y?: number;
  aria?: { [key: string]: string };
  data?: { [key: string]: string };
};


const BarGraph = ({
  aria = {},
  data = {},
  align = "center",
  axisTitle,
  dark = false,
  chartData,
  className = "pb_bar_graph",
  colors,
  id,
  pointStart,
  subTitle,
  type = "column",
  title = "Title",
  xAxisCategories,
  yAxisMin,
  yAxisMax,
  legend = false,
  toggleLegendClick = true,
  height,
  layout = "horizontal",
  verticalAlign = "bottom",
  x = 0,
  y = 0,
  ...props
}: BarGraphProps) => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();

  const staticOptions = {
    title: {
      text: title,
    },
    chart: {
      height: height,
      type: type,
    },
    subtitle: {
      text: subTitle,
    },
    yAxis: {
      min: yAxisMin,
      max: yAxisMax,
      title: {
        text: axisTitle,
      },
    },
    xAxis: {
      categories: xAxisCategories,
    },
    legend: {
      enabled: legend,
      align: align,
      verticalAlign: verticalAlign,
      layout: layout,
      x: x,
      y: y,
    },
    colors:
      colors !== undefined && colors.length > 0
        ? mapColors(colors)
        : highchartsTheme.colors,
    plotOptions: {
      series: {
        pointStart: pointStart,
        events: {},
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: chartData,
    credits: false,
  };

  if (!toggleLegendClick) {
    staticOptions.plotOptions.series.events = { legendItemClick: () => false };
  }

  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({ ...staticOptions });
  }, [chartData]);

  return (
    <HighchartsReact
      containerProps={{
        className: classnames(globalProps(props), className),
        id: id,
        ...ariaProps,
        ...dataProps,
      }}
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default BarGraph;
