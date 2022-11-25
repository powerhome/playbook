import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import HighchartsReact from "highcharts-react-official";

import Highcharts from "highcharts";

import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";
import { globalProps } from "../utilities/globalProps";
import { buildAriaProps, buildDataProps } from "../utilities/props";

type CircleChartProps = {
  align?: "left" | "right" | "center";
  aria: { [key: string]: string };
  chartData?: [];
  children?: Node;
  className?: string;
  colors?: string[];
  dark?: Boolean;
  data?: Object;
  dataLabelHtml?: string;
  dataLabels?: boolean;
  headerFormat?: string;
  height?: string;
  id?: string;
  innerSize?: "sm" | "md" | "lg" | "none";
  legend?: boolean;
  maxPointSize?: number;
  minPointSize?: number;
  rounded?: boolean;
  startAngle?: number;
  style?: string;
  title?: string;
  tooltipHtml?: string;
  useHtml?: boolean;
  zMin?: number;
  layout?: "horizontal" | "vertical" | "proximate";
  verticalAlign?: "top" | "middle" | "bottom";
  x?: number;
  y?: number;
  borderColor?: string;
  borderWidth?: number;
};


// Adjust Circle Chart Block Kit Dimensions to Match the Chart for Centering
const alignBlockElement = (event: any) => {
  const itemToMove = document.querySelector(
    `#wrapper-circle-chart-${event.target.renderTo.id} .pb-circle-chart-block`
  ) as HTMLElement;
  const chartContainer = document.querySelector(`#${event.target.renderTo.id}`);
  if (itemToMove !== null) {
    itemToMove.style.height = `${event.target.chartHeight}px`;
    itemToMove.style.width = `${event.target.chartWidth}px`;
    chartContainer.firstChild.before(itemToMove);
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
  dark = false,
  data = {},
  dataLabelHtml = "<div>{point.name}</div>",
  dataLabels = false,
  headerFormat = null,
  height,
  id,
  innerSize = "md",
  legend = false,
  maxPointSize = null,
  minPointSize = null,
  startAngle = null,
  style = "pie",
  title,
  tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' +
    "<b>{point.y}</b)>",
  useHtml = false,
  zMin = null,
  layout = "horizontal",
  verticalAlign = "bottom",
  x = 0,
  y = 0,
  ...props
}: CircleChartProps) => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();

  const innerSizes = { sm: "35%", md: "50%", lg: "85%", none: "0%" };
  const innerSizeFormat = (size: "sm" | "md" | "lg" | "none") =>
    innerSizes[size];

  const componentDidMount = useRef(false);

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

      tooltip: {
        headerFormat: headerFormat,
        pointFormat: tooltipHtml,
        useHTML: useHtml,
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
    setOptions({ ...staticOptions });
    if (componentDidMount.current) {
      Highcharts.charts.forEach((chart: any) => {
        if (chart && chart.renderTo.id === id) {
          const updatedValueArray = chartData.map((obj: any) => {
            return obj.value;
          });
          chart.series[0].setData(updatedValueArray);
        }
      });
    } else {
      componentDidMount.current = true;
    }
  }, [chartData]);

  return (
    <div id={`wrapper-circle-chart-${id}`}>
      <HighchartsReact
        containerProps={{
          className: classnames("pb_circle_chart", globalProps(props)),
          id: id,
          ...ariaProps,
          ...dataProps,
        }}
        highcharts={Highcharts}
        options={options}
      />
        {children ? (
          <div className="pb-circle-chart-block">{children}</div>
        ) : null}
    </div>
  );
};

export default CircleChart;
