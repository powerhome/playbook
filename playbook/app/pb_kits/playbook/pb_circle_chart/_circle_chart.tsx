import React, { useEffect, useState } from "react";
import classnames from "classnames";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

import Highcharts from "highcharts";

import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";
import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props";
import { merge } from '../utilities/object'

type CircleChartProps = {
  align?: "left" | "right" | "center";
  aria: { [key: string]: string };
  chartData?: [];
  children?: Node;
  className?: string;
  colors?: string[];
  customOptions?: Partial<Highcharts.Options>;
  dark?: boolean;
  data?: {[key: string]: string},
  dataLabelHtml?: string;
  dataLabels?: boolean;
  height?: string;
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  innerSize?: "sm" | "md" | "lg" | "none";
  legend?: boolean;
  maxPointSize?: number;
  minPointSize?: number;
  rounded?: boolean;
  startAngle?: number;
  style?: string;
  title?: string;
  tooltipHtml: string;
  useHtml?: boolean;
  zMin?: number;
  layout?: "horizontal" | "vertical" | "proximate";
  verticalAlign?: "top" | "middle" | "bottom";
  x?: number;
  y?: number;
  borderColor?: string;
  borderWidth?: number;
};



const alignBlockElement = (event: any) => {
  const itemToMove = document.querySelector<HTMLElement>(
    `#wrapper-circle-chart-${event.target.renderTo.id} .pb-circle-chart-block`
  );
  const chartContainer = document.querySelector(`#${event.target.renderTo.id}`);

  if (itemToMove !== null && chartContainer !== null) {
    itemToMove.style.height = `${event.target.chartHeight}px`;
    itemToMove.style.width = `${event.target.chartWidth}px`;
    if (chartContainer.firstChild !== null) {
      chartContainer.firstChild.before(itemToMove);
    }
  }
};

const CircleChart = ({
  align = "center",
  aria = {},
  rounded = false,
  borderColor = rounded ? null : "",
  borderWidth = rounded ? 20 : null,
  chartData,
  children,
  className,
  colors = [],
  customOptions = {},
  dark = false,
  data = {},
  dataLabelHtml = "<div>{point.name}</div>",
  dataLabels = false,
  height,
  htmlOptions = {},
  id,
  innerSize = "md",
  legend = false,
  maxPointSize = null,
  minPointSize = null,
  startAngle = null,
  style = "pie",
  title,
  tooltipHtml,
  useHtml = false,
  zMin = null,
  layout = "horizontal",
  verticalAlign = "bottom",
  x = 0,
  y = 0,
  ...props
}: CircleChartProps) => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  highchartsMore(Highcharts);

  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();

  Highcharts.setOptions({
    tooltip: {
      headerFormat: null,
      pointFormat: tooltipHtml ? tooltipHtml : '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' + "<b>{point.y}</b>",
      useHTML: useHtml,
    },
  });

  const innerSizes = { sm: "35%", md: "50%", lg: "85%", none: "0%" };
  const innerSizeFormat = (size: "sm" | "md" | "lg" | "none") =>
    innerSizes[size];


  const filteredProps: any = {...props};
  delete filteredProps.verticalAlign;

  const [options, setOptions] = useState({});

  useEffect(() => {
    const formattedChartData = chartData.map((obj: any) => {
      obj.y = obj.value;
      delete obj.value;
      return obj;
    });

    const staticOptions = {
      title: {
        text: title,
      },
      chart: {
        height: height,
        type: style,
        events: {
          render: (event: any) => alignBlockElement(event),
          redraw: (event: any) => alignBlockElement(event),
        },
      },

      legend: {
        align: align,
        verticalAlign: verticalAlign,
        layout: layout,
        x: x,
        y: y,
      },
      plotOptions: {
        pie: {
          colors:
            colors.length > 0 ? mapColors(colors) : highchartsTheme.colors,
          dataLabels: {
            enabled: dataLabels,
            connectorShape: "straight",
            connectorWidth: 3,
            format: dataLabelHtml,
          },
          showInLegend: legend,
        },
      },
      series: [
        {
          minPointSize: minPointSize,
          maxPointSize: maxPointSize,
          innerSize: borderWidth == 20 ? "100%" : innerSizeFormat(innerSize),
          data: formattedChartData,
          zMin: zMin,
          startAngle: startAngle,
          borderWidth: borderWidth,
          borderColor: borderColor,
        },
      ],
      credits: false,
    };
    setOptions(merge(staticOptions, customOptions));
  }, [chartData]);


  return (
    <>
      {children ? (
        <div id={`wrapper-circle-chart-${id}`}>
          <HighchartsReact
              containerProps={{
              className: classnames("pb_circle_chart", globalProps(filteredProps)),
              id: id,
              ...ariaProps,
              ...dataProps,
              ...htmlProps,
            }}
              highcharts={Highcharts}
              options={options}
          />
          <div className="pb-circle-chart-block">{children}</div>
        </div>
      ) : (
        <HighchartsReact
            containerProps={{
            className: classnames("pb_circle_chart", globalProps(filteredProps)),
            id: id,
            ...ariaProps,
            ...dataProps,
            ...htmlProps,
          }}
            highcharts={Highcharts}
            options={options}
        />
      )}
    </>
  );
};

export default CircleChart;
