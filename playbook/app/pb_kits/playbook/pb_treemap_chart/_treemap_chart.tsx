// import React, { useState, useEffect } from "react";
// import classnames from "classnames";

// import { globalProps } from "../utilities/globalProps";
// import { buildAriaProps, buildDataProps } from "../utilities/props";

// import HighchartsReact from "highcharts-react-official";
// import { highchartsTheme } from "../pb_dashboard/pbChartsLightTheme";
// import { highchartsDarkTheme } from "../pb_dashboard/pbChartsDarkTheme";
// import mapColors from "../pb_dashboard/pbChartsColorsHelper";
// import treemap from 'highcharts/modules/treemap'

// type TreemapChartProps = {
//   chartData: {
//     name: string,
//     parent?: string | number,
//     value: number,
//     color?: string,
//     id?: string | number,
//   }[],
//   className?: string,
//   colors: string[],
//   dark?: boolean,
//   drillable: boolean,
//   grouped: boolean,
//   height?: string,
//   id: number | string,
//   title?: string,
//   tooltipHtml: string,
//   type?: string,
//   aria?: { [key: string]: string },
//   data?: { [key: string]: string },
// };

// const TreemapChart = ({
//   aria = {},
//   data = {},
//   chartData,
//   colors,
//   dark = false,
//   drillable = false,
//   grouped = false,
//   height,
//   id,
//   title = "",
//   tooltipHtml = '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: <b>{point.value}</b>',
//   type = "treemap",
//   ...props
// }: TreemapChartProps) => {
//   const ariaProps = buildAriaProps(aria);
//   const dataProps = buildDataProps(data);

//   const staticOptions = {
//     title: {
//       text: title,
//     },
//     chart: {
//       height: height,
//       type: type,
//     },
//     credits: false,
//     series: [
//       {
//         data: chartData,
//       },
//     ],
//     plotOptions: {
//       treemap: {
//         tooltip: {
//           pointFormat: tooltipHtml,
//         },
//         allowTraversingTree: drillable,
//         colorByPoint: !grouped,
//         colors:
//           colors !== undefined && colors.length > 0
//             ? mapColors(colors)
//             : highchartsTheme.colors,
//       },
//     },
//   };

//   const [options, setOptions] = useState({});
//   const [isHighchartsLoaded, setIsHighchartsLoaded] = useState(false);

//   useEffect(() => {
//     setOptions({ ...staticOptions });

//     const interval = setInterval(() => {
//       if (window.Highcharts) {
//         clearInterval(interval)
//         dark
//           ? window.Highcharts.setOptions(highchartsDarkTheme(window.Highcharts))
//           : window.Highcharts.setOptions(highchartsTheme(window.Highcharts))
        
//         treemap(window.Highcharts)
//         setIsHighchartsLoaded(true)
//       }
//     }, 0)
//   }, [chartData]);

//   return (
//     isHighchartsLoaded &&
//     <HighchartsReact
//       containerProps={{
//         className: classnames(globalProps(props), "pb_treemap_chart"),
//         id: id,
//         ...ariaProps,
//         ...dataProps,
//       }}
//       highcharts={window.Highcharts}
//       options={options}
//     />
//   );
// };

// export default TreemapChart;
