import React, { useState, useEffect } from "react";
import classnames from "classnames";

import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";
import treemap from 'highcharts/modules/treemap'
import { merge } from 'lodash'


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
  customOptions?: Partial<Highcharts.Options>;
  dark?: boolean;
  drillable: boolean;
  grouped: boolean;
  height?: string;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id: number | string;
  title?: string;
  tooltipHtml: string;
  type?: string;
  aria?: { [key: string]: string };
  data?: { [key: string]: string };
};

const TreemapChart = ({
  aria = {},
  data = {},
  chartData,
  colors,
  customOptions = {},
  dark = false,
  drillable = false,
  grouped = false,
  height,
  htmlOptions = {},
  id,
  title = "",
  tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: <b>{point.value}</b>',
  type = "treemap",
  ...props
}: TreemapChartProps): React.ReactElement => {

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  treemap(Highcharts)
  setupTheme();

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
        tooltip: {
          pointFormat: tooltipHtml,
        },
        allowTraversingTree: drillable,
        colorByPoint: !grouped,
        colors:
          colors !== undefined && colors.length > 0
            ? mapColors(colors)
            : highchartsTheme.colors,
      },
    },
  };

  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(merge(staticOptions, customOptions));
  }, [chartData]);

  return (
    <HighchartsReact
        containerProps={{
          className: classnames(globalProps(props), "pb_treemap_chart"),
          id: id,
          ...ariaProps,
          ...dataProps,
          ...htmlProps
      }}
        highcharts={Highcharts}
        options={options}
    />
  );
};

export default TreemapChart;
