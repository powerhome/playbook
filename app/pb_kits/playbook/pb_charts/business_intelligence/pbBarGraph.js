import pbHighcharts from "./pbHighcharts.js";

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
    series.borderWidth = 0;
    series.shadow = false;
};

const pbBarGraph = function(highchart) {
  sizeColumns(highchart);
  pbHighcharts(highchart);
};

export default pbBarGraph;
