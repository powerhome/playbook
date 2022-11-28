import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import themecolors from "../tokens/exports/_colors.scss";
import typography from "../tokens/exports/_typography.scss";

import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

type GaugeProps = {
  aria: { [key: string]: string };
  className?: string;
  chartData?: { name: string; value: number[] | number }[];
  dark?: Boolean;
  data?: { [key: string]: string };
  disableAnimation?: boolean;
  fullCircle?: boolean;
  height?: string;
  id?: string;
  max?: number;
  min?: number;
  prefix?: string;
  showLabels?: boolean;
  style?: string;
  suffix?: string;
  title?: string;
  tooltipHtml?: string;
  colors: string[];
  minorTickInterval: any;
  circumference: number[];
};

const Gauge = ({
  aria = {},
  className,
  chartData,
  dark = false,
  data = {},
  disableAnimation = false,
  fullCircle = false,
  height = null,
  id,
  max = 100,
  min = 0,
  prefix = "",
  showLabels = false,
  style = "solidgauge",
  suffix = "",
  title = "",
  tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' +
    "<b>{point.y}</b>",
  colors = [],
  minorTickInterval = null,
  circumference = fullCircle ? [0, 360] : [-100, 100],
  ...props
}: GaugeProps) => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();
  

  const css = buildCss({
    pb_gauge_kit: true,
  });

  const componentDidMount = useRef(false);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const formattedChartData = chartData.map((obj: any) => {
      obj.y = obj.value;
      delete obj.value;
      return obj;
    });

    const staticOptions = {
      chart: {
        events: {
          load() {
            setTimeout(this.reflow.bind(this), 0);
          },
        },
        type: style,
        height: height,
      },
      title: {
        text: title,
      },
      yAxis: {
        min: min,
        max: max,
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: minorTickInterval,
        tickAmount: 2,
        tickPositions: [min, max],
        labels: {
          y: 26,
          enabled: showLabels,
        },
      },
      credits: false,
      series: [
        {
          data: formattedChartData,
        },
      ],
      pane: {
        center: ["50%", "50%"],
        size: "90%",
        startAngle: circumference[0],
        endAngle: circumference[1],
        background: {
          borderWidth: 20,
          innerRadius: "90%",
          outerRadius: "90%",
          shape: "arc",
          className: "gauge-pane",
        },
      },
      tooltip: {
        pointFormat: tooltipHtml,
        followPointer: true,
      },
      colors:
        colors !== undefined && colors.length > 0
          ? mapColors(colors)
          : highchartsTheme.colors,
      plotOptions: {
        series: {
          animation: !disableAnimation,
        },
        solidgauge: {
          borderColor:
            colors !== undefined && colors.length === 1
              ? mapColors(colors).join()
              : highchartsTheme.colors[0],
          borderWidth: 20,
          radius: 90,
          innerRadius: "90%",
          dataLabels: {
            borderWidth: 0,
            color: themecolors.text_lt_default,
            enabled: true,
            format:
              `<span class="prefix">${prefix}</span>` +
              '<span class="fix">{y:,f}</span>' +
              `<span class="suffix">${suffix}</span>`,
            style: {
              fontFamily: typography.font_family_base,
              fontWeight: typography.regular,
              fontSize: typography.heading_2,
            },
            y: -26,
          },
        },
      },
    };

    setOptions({ ...staticOptions});
    
    document
      .querySelectorAll(".gauge-pane")
      .forEach((pane) => pane.setAttribute("stroke-linejoin", "round"));
    if (document.querySelector(".prefix")) {
      document
        .querySelectorAll(".prefix")
        .forEach((prefix) => prefix.setAttribute("y", "28"));
      document
        .querySelectorAll(".fix")
        .forEach((fix) => fix.setAttribute("y", "38"));
    }
    if (componentDidMount.current) {
      Highcharts.charts.forEach((chart: any) => {
        if (chart && chart.renderTo.id === id) {
          chart.series[0].setData([chartData[0].value]);
          chart.series[0].data[0].name = chartData[0].name;
        }
      });
    } else {
      componentDidMount.current = true;
    }
  }, [chartData]);

  return (
    <HighchartsReact
      containerProps={{
        className: classnames(css, globalProps(props)),
        id: id,
        ...ariaProps,
        ...dataProps,
      }}
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default Gauge;
