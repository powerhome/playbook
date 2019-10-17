import { commonSettings } from "../pb_dashboard/commonSettings.js";
import typography from "../tokens/_typography.scss";

const markerStyles = highchart => {
  highchart.plotOptions.line.marker.enabled = true;
  highchart.plotOptions.series.marker.enabled = true;
  highchart.plotOptions.series.marker.fillColor = "white";
  highchart.plotOptions.series.marker.lineWidth = 2;
};

const fixTooltipStyles = () => {
  document.getElementById("main-view").setAttribute("style", "position: static !important");
};

const styleDataLabels = highchart => {
  let series = highchart.plotOptions.series;

  series.dataLabels.style.fontFamily = typography.font_family_base;
  series.dataLabels.style.fontSize = typography.text_small;
  series.dataLabels.style.fontWeight = typography.bold;
};

const pbLineGraph = highchart => {
  commonSettings(highchart);
  styleDataLabels(highchart);
  markerStyles(highchart);
  fixTooltipStyles();
};

export default pbLineGraph;
