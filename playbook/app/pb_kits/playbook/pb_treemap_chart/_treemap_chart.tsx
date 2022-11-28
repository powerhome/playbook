import React, { useState, useEffect } from "react";
import classnames from "classnames";

import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps } from "../utilities/props";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";
import treemap from 'highcharts/modules/treemap'

type TreemapChartProps = {
  chartData: {
    name: string;
    parent?: string | number;
    value: number;
    color?: string;
    id?: string | number;
  }[];
  className?: string;
  colors: string[];
  dark?: boolean;
  drillable: boolean;
  grouped: boolean;
  height?: string;
  id: number | string;
  title?: string;
  tooltipHtml: () => {};
  type?: string;
  aria?: { [key: string]: string };
  data?: { [key: string]: string };
};

const TreemapChart = ({
  aria = {},
  data = {},
  chartData,
  colors,
  dark = false,
  drillable = false,
  grouped = false,
  height,
  id,
  title = "",
  tooltipHtml = function () {return `<span style="font-weight: bold; color: ${this.point.color};">&#9679; </span> ${this.point.name}: <b>${this.point.value}</b>`},
  type = "treemap",
  ...props
}: TreemapChartProps) => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();
  treemap(Highcharts)


  const staticOptions = {
    title: {
      text: title,
    },
    chart: {
      height: height,
      type: type,
    },
    credits: false,
    series: [
      {
        data: chartData,
      },
    ],
    plotOptions: {
      treemap: {
        allowTraversingTree: drillable,
        colorByPoint: !grouped,
        colors:
          colors !== undefined && colors.length > 0
            ? mapColors(colors)
            : highchartsTheme.colors,
      },
    },
    tooltip: {
      formatter: tooltipHtml,
      useHTML: true,
    },
  };

  const [options, setOptions] = useState({});

  useEffect(() => {
    
    setOptions({ ...staticOptions });
  }, [chartData]);

  return (
    <HighchartsReact
      containerProps={{
        className: classnames(globalProps(props), "pb_treemap_chart"),
        id: id,
        ...ariaProps,
        ...dataProps,
      }}
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default TreemapChart;
