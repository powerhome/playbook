import pbHighcharts from "./pbHighcharts.js"

const markerStyles = function(highchart){
  highchart.plotOptions.line.marker.enabled = true;
  highchart.plotOptions.series.marker.enabled = true;
  highchart.plotOptions.series.marker.fillColor = "white";
  highchart.plotOptions.series.marker.lineWidth = 2;
}

const pbLineGraph = function(highchart) {
  pbHighcharts(highchart);
  markerStyles(highchart);
};

export default pbLineGraph;
