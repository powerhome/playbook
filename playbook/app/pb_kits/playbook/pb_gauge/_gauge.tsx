import React, { useState, useEffect } from "react";
import classnames from "classnames";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
import mapColors from "../pb_dashboard/pbChartsColorsHelper";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import defaultColors from "../tokens/exports/_colors.module.scss";
import typography from "../tokens/exports/_typography.module.scss";

import { deprecatedKitWarning } from "../utilities/deprecated";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import { GenericObject } from "../types";
import { merge } from '../utilities/object' 

type GaugeProps = {
  aria: { [key: string]: string };
  className?: string;
  chartData?: { name: string; value: number[] | number }[];
  customOptions?: Partial<Highcharts.Options>;
  dark?: boolean;
  data?: { [key: string]: string };
  disableAnimation?: boolean;
  fullCircle?: boolean;
  height?: string;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
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
  minorTickInterval?: number;
  circumference: number[];
};

const Gauge = ({
  aria = {},
  chartData,
  customOptions = {},
  dark = false,
  data = {},
  disableAnimation = false,
  fullCircle = false,
  height = null,
  htmlOptions = {},
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
}: GaugeProps): React.ReactElement => {
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();

  //set tooltip directly to prevent being overriden by Highcharts defaults
  Highcharts.setOptions({
    tooltip: {
      pointFormat: tooltipHtml,
      followPointer: true,
    },
  });

  const css = buildCss({
    pb_gauge_kit: true,
  });

  const [options, setOptions] = useState({});

  useEffect(() => {
    const formattedChartData = chartData.map((obj: GenericObject) => {
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
            color: defaultColors.text_lt_default,
            enabled: true,
            format:
              `<span class="prefix${dark ? " dark" : ""}">${prefix}</span>` +
              `<span class="fix${dark ? " dark" : ""}">{y:,f}</span>` +
              `<span class="suffix${dark ? " dark" : ""}">${suffix}</span>`,
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

    setOptions(merge(staticOptions, customOptions));

    if (document.querySelector(".prefix")) {
      document.querySelectorAll(".prefix").forEach((prefix) => {
        prefix.setAttribute("y", "28");
      });
      document
        .querySelectorAll(".fix")
        .forEach((fix) => fix.setAttribute("y", "38"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

    useEffect(() => {
    // Warn about deprecated kit
    deprecatedKitWarning('Gauge', 'Please use "PbGaugeChart" instead.');
  }, []);

  return (
    <HighchartsReact
        containerProps={{
        className: classnames(css, globalProps(props)),
        id: id,
        ...ariaProps,
        ...dataProps,
        ...htmlProps,
      }}
        highcharts={Highcharts}
        options={options}
    />
  );
};

export default Gauge;
