import commonSettings from "../pb_dashboard/commonSettings.js";

const markerStyles = function(highchart){
  highchart.plotOptions.line.marker.enabled = true;
  highchart.plotOptions.series.marker.enabled = true;
  highchart.plotOptions.series.marker.fillColor = "white";
  highchart.plotOptions.series.marker.lineWidth = 2;
}

const pbLineGraph = function(highchart) {
  commonSettings(highchart);
  markerStyles(highchart);
};

export default pbLineGraph;
