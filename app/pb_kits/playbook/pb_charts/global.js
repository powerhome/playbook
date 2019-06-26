let applyCustomColors = function(highchart) {
  var colors = [
    "#004DFF",
    "#9E64E9",
    "#00C4D7",
    "#0082FF",
    "#00CA74",
    "#F9BB00",
    "#FF2229"
  ];

  highchart.series.forEach(function(item, index) {
    var selected_color = colors[index % colors.length];
    item.color = selected_color;
    item.data.forEach(function(data_item) {
      data_item.color = selected_color;
    });
  });
};

let styleChartContainer = function(highchart) {
  highchart.chart.spacingTop = 30;
  highchart.chart.spacingBottom = 40;
  highchart.chart.spacingLeft = 60;
  highchart.chart.spacingRight = 60;
};

let styleLegend = function(highchart) {
  highchart.legend.itemStyle.fontFamily = "Proxima Nova";
  highchart.legend.itemStyle.color = "#8798AD";
  highchart.legend.itemStyle.fontWeight = "300";
  highchart.legend.itemStyle.fontSize = "14px";
};


// Exportable Global Styles Function
export const applyGlobalStyles = function(highchart) {
  applyCustomColors(highchart);
  styleChartContainer(highchart);
  styleLegend(highchart);
};

export default applyGlobalStyles;