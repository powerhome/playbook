import colors from '../tokens/_colors.scss';

export function add(a, b){
  return a + b;
}

export function styleChartContainer(highchart) {
  highchart.chart.spacingTop = 30;
  highchart.chart.spacingBottom = 40;
  highchart.chart.spacingLeft = 60;
  highchart.chart.spacingRight = 60;
};

/* Style Legend */
export function styleLegend(highchart) {
  highchart.legend.itemStyle.fontFamily = "Proxima Nova";
  highchart.legend.itemStyle.color = "#8798AD";
  highchart.legend.itemStyle.fontWeight = "300";
  highchart.legend.itemStyle.fontSize = "14px";
};


/* Size columns */
export function sizeColumns(highchart) {
  highchart.plotOptions.column.borderRadius = 6;
  highchart.plotOptions.column.pointPadding = 0.3;
  highchart.plotOptions.column.groupPadding = 0.2;
  highchart.plotOptions.series.pointPadding = 0.3;
  highchart.plotOptions.series.groupPadding = 0.2;
  highchart.plotOptions.series.borderWidth = 0;
  highchart.plotOptions.column.borderWidth = 0;
  highchart.plotOptions.series.shadow = false;
  highchart.plotOptions.column.shadow = false;
};

/* Remove grid from background */
export function styleAxis(highchart) {
  if (Array.isArray(highchart.yAxis)) {
    highchart.yAxis.forEach(function(item, index) {
      _adjustAxisStyle(item);
    });
  } else {
    _adjustAxisStyle(highchart.yAxis);
  }

  if (Array.isArray(highchart.xAxis)) {
    highchart.xAxis.forEach(function(item, index) {
      _adjustAxisStyle(item);
    });
  } else {
    _adjustAxisStyle(highchart.xAxis);
  }
}

export function _adjustAxisStyle(axis) {

  /* Styles grid */
  axis.minorGridLineColor = "#E0E6EC";
  axis.minorGridLineWidth = 0.5;
  axis.minorGridLineDashStyle = "Dash";
  axis.gridLineWidth = 0.5;
  axis.gridLineColor = "#E0E6EC";
  axis.gridLineDashStyle = "Dash";

  /* Change line color to $sky */
  axis.lineColor = this.colors.border_light;

  /* Change axis label styles */
  axis.labels.style.fontFamily = "Proxima Nova";
  axis.labels.style.color = "#B0BAC9";
  axis.labels.style.fontWeight = "300";
  axis.labels.style.fontSize = "14px";
};

export { colors };

// module.exports = {
//   colors,
//   styleChartContainer,
//   styleLegend,
//   sizeColumns,
//   styleAxis,
//   _adjustAxisStyle
// }
// export { colors, styleChartContainer, styleLegend, sizeColumns, styleAxis, _adjustAxisStyle };
