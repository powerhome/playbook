import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import Highcharts from "highcharts/highcharts-gantt";

import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";

type GanttChartProps = {
  aria?: { [key: string]: string };
  className?: string;
  customOptions: Partial<Highcharts.Options>;
  dark?: boolean;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  ref?: HighchartsReactRefObject;
};

const GanttChart = (props: GanttChartProps) => {
  const {
    aria = {},
    className,
    customOptions = {},
    dark = false,
    data = {},
    htmlOptions = {},
    id,
  } = props;

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_gantt_chart"),
    globalProps(props),
    className
  );

  const [options, setOptions] = useState<Highcharts.Options | undefined>(customOptions);

  useEffect(() => {
    setOptions(customOptions);
  }, [customOptions]);

  const setupTheme = () => {
    dark
      ? Highcharts.setOptions(highchartsDarkTheme)
      : Highcharts.setOptions(highchartsTheme);
  };
  setupTheme();

  return (
    <div>
      <HighchartsReact
          constructorType={"ganttChart"}
          containerProps={{
            className: classnames(globalProps(props), classes),
            id: id,
            ...ariaProps,
            ...dataProps,
            ...htmlProps,
          }}
          highcharts={Highcharts}
          options={options}
          ref={ref}
      />
    </div>
  );
};

export default GanttChart;
