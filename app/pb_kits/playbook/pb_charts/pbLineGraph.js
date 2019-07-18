import { pbHighcharts } from "./pbHighcharts.js";

const pbLineGraph = function(highchart) {
  highchart.plotOptions.series.marker.enabled = true;
  highchart.plotOptions.line.marker.enabled = true;
  highchart.plotOptions.series.marker.fillColor = "white";
  highchart.plotOptions.series.marker.lineWidth = 2;
  pbHighcharts(highchart);
};

export default pbLineGraph;
