import commonSettings from "../pb_dashboard/commonSettings.js";
import typography from "../tokens/_typography.scss";

const sizeColumns = function(highchart) {
  let column = highchart.plotOptions.column;
  let series = highchart.plotOptions.series;

  column.borderRadius = 0;
  column.pointPadding = 0.3;
  column.groupPadding = 0.2;

  series.borderWidth = 0;
  series.shadow = false;
  series.pointPadding = 0.3;
  series.groupPadding = 0.2;
};

const styleDataLabels = highchart => {
  let series = highchart.plotOptions.series;

  series.dataLabels.style.fontFamily = typography.font_family_base;
  series.dataLabels.style.fontSize = typography.text_small;
};

const barGraphSettings = function(highchart) {
  commonSettings(highchart);
  sizeColumns(highchart);
  styleDataLabels(highchart);
};

export default barGraphSettings;
