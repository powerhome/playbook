import { Options, LegendOptions } from "highcharts";
export interface ThemeProps
  extends Pick<
    Options,
    | "credits"
    | "chart"
    | "colors"
    | "lang"
    | "title"
    | "subtitle"
    | "xAxis"
    | "yAxis"
    | "legend"
    | "tooltip"
    | "pane"
    | "plotOptions"
  > {
  colorKey?: string;
  legend?: LegendOptions;
}
