import distributionBar from "./distribution_bar.svg";
import filter from "./kit_filter.svg";
import legend from "./legend.svg";
import list from "./list.svg";
import map from "./map.svg";
import pbBarGraph from "./pb_bar_graph.svg";
import table from "./table.svg";
import pbCircleChart from "./pb_circle_chart.svg";
import pbGaugeChart from "./pb_gauge_chart.svg";
import pbLineGraph from "./pb_line_graph.svg";

export const dataAndVisualizationPreviewMap = {
  "data_visualization/distribution_bar": distributionBar,
  "data_visualization/filter": filter,
  "data_visualization/legend": legend,
  "data_visualization/list": list,
  "data_visualization/map": map,
  "data_visualization/pb_bar_graph": pbBarGraph,
  "data_visualization/table": table,
  "data_visualization/pb_circle_chart": pbCircleChart,
  "data_visualization/pb_gauge_chart": pbGaugeChart,
  "data_visualization/pb_line_graph": pbLineGraph,
} as const;