import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps } from "../utilities/props";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";

type LineGraphProps = {
  align?: "left" | "right" | "center";
  axisTitle?: string;
  dark?: Boolean;
  xAxisCategories: [];
  yAxisMin: number;
  yAxisMax: number;
  className?: string;
  chartData: {
    name: string;
    data: number[];
  }[];
  gradient?: boolean;
  id: string;
  pointStart: number;
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

const LineGraph = ({
  aria = {},
  data = {},
  align = "center",
  className = "pb_bar_graph",
  dark = false,
  gradient = false,
  type = "line",
  id,
  legend = false,
  toggleLegendClick = true,
  layout = "horizontal",
  verticalAlign = "bottom",
  x = 0,
  y = 0,
  axisTitle,
  xAxisCategories,
  yAxisMin,
  yAxisMax,
  chartData,
  pointStart,
  subTitle,
  title,
  height,
  colors = [],
  ...props
}: LineGraphProps) => {
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

export default LineGraph;
