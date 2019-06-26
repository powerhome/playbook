import colors from '../tokens/_colors.scss';


// Connect to Sisense
Sisense.connect("http://10.1.1.242:8081").then(function(app) {
  var dashboard_id = "5cd43e9035a43704b0be554b";
  console.log("Sisense is connected");
});

/* Apply custom playbook colors through script */
function applyCustomColors(highchart) {
  var colors = [
    this.colors.data_1,
    this.colors.data_2,
    this.colors.data_3,
    this.colors.data_4,
    this.colors.data_5,
    this.colors.data_6,
    this.colors.data_7
  ];

  highchart.series.forEach(function(item, index) {
    var selected_color = colors[index % colors.length]
    item.color = selected_color;
    item.data.forEach(function(data_item, index) {
      data_item.color = selected_color;
    });
  });
};


function styleChartContainer(highchart) {
  highchart.chart.spacingTop = chartContainerSpacing.chart.spacingTop;
  highchart.chart.spacingBottom = chartContainerSpacing.chart.spacingTop;
  highchart.chart.spacingLeft = chartContainerSpacing.chart.spacingTop;
  highchart.chart.spacingRight = chartContainerSpacing.chart.spacingTop;
};


/* Style Legend */
function styleLegend(highchart) {
  highchart.legend.itemStyle.fontFamily = legendOptions.itemStyle.fontFamily;
  highchart.legend.itemStyle.color = legendOptions.itemStyle.color;
  highchart.legend.itemStyle.fontWeight = legendOptions.itemStyle.fontWeight;
  highchart.legend.itemStyle.fontSize = legendOptions.itemStyle.fontSize;
};


/* Size columns */
function sizeColumns(highchart) {
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
function styleAxis(highchart) {
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

function _adjustAxisStyle(axis) {

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


export {
  styleChartContainer,
  styleLegend,
  sizeColumns,
  styleAxis,
  _adjustAxisStyle
};
