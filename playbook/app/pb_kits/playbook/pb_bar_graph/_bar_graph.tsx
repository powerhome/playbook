import React, { useState, useEffect } from "react";
import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props";
import { deprecatedKitWarning } from "../utilities/deprecated";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";
import { merge } from '../utilities/object'

import classnames from "classnames";

type BarGraphProps = {
  align?: "left" | "right" | "center";
  axisTitle: { name: string; }[] | string;
  dark?: boolean;
  xAxisCategories: [];
  yAxisMin: number;
  yAxisMax: number;
  chartData: { name: string; data: number[], yAxis: number }[];
  className?: string;
  customOptions?: Partial<Highcharts.Options>;
  id: string;
  pointStart: number;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
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
  stacking?: "normal" | "percent" 
  axisFormat?: { format: string; }[] | string;
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
  htmlOptions = {},
  customOptions = {},
  axisFormat,
  id,
  pointStart,
  stacking,
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
}: BarGraphProps): React.ReactElement => { 
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
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
    yAxis: [{
      labels: {
        format: typeof axisFormat === 'string' ? axisFormat : (axisFormat && axisFormat[0] ? axisFormat[0].format : "")

      },
      min: yAxisMin,
      max: yAxisMax,
      opposite: false,
      title: {
        text: Array.isArray(axisTitle) ? (axisTitle.length > 0 ? axisTitle[0].name : null) : axisTitle,
      },
      plotLines: typeof yAxisMin !== 'undefined' && yAxisMin !== null ? [] : [{
        value: 0,
        zIndex: 10,
        color: "#E4E8F0"
    }],
    }],
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
        stacking: stacking,
        pointStart: pointStart,
        borderWidth: stacking ? 0 : "",
        events: {},
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: chartData,
    credits: false,
  };

if (Array.isArray(axisTitle) && axisTitle.length > 1 && axisTitle[1].name) {
  staticOptions.yAxis.push({
    labels: {
      format: typeof axisFormat === 'string' ? axisFormat : axisFormat[1].format,
    },
    min: yAxisMin,
    max: yAxisMax,
    opposite: true,
    title: {
      text: axisTitle[1].name,
    }, 
    plotLines: typeof yAxisMin !== 'undefined' && yAxisMin !== null ? [] : [{
      value: 0,
      zIndex: 10,
      color: "#E4E8F0"
  }],
  });
}

  if (!toggleLegendClick) {
    staticOptions.plotOptions.series.events = { legendItemClick: () => false };
  }

  const filteredProps: any = {...props};
  delete filteredProps.verticalAlign;

  const [options, setOptions] = useState({});

  useEffect(() => {
    // Warn about deprecated kit (only once per page load, dev mode only)
    deprecatedKitWarning('BarGraph', 'Please use "PbBarGraph" instead.');
  }, []);

  useEffect(() => {
    setOptions(merge(staticOptions, customOptions));
  }, [chartData]);

  return (
    <HighchartsReact
        containerProps={{
          className: classnames(globalProps(filteredProps), className),
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

export default BarGraph;
