import colors from '../tokens/_colors.scss';
import typography from '../tokens/_typography.scss';

const applyCustomColors = function(highchart) {
  var data_colors = [
    colors.data_1,
    colors.data_2,
    colors.data_3,
    colors.data_4,
    colors.data_5,
    colors.data_6,
    colors.data_7
  ];

  highchart.series.forEach(function(item, index) {
    var selected_color = data_colors[index % data_colors.length];
    item.color = selected_color;
    item.data.forEach(function(data_item) {
      data_item.color = selected_color;
    });
  });
};

const styleChartContainer = function(highchart) {
  highchart.chart.spacingTop = 30;
  highchart.chart.spacingBottom = 40;
  highchart.chart.spacingLeft = 50;
  highchart.chart.spacingRight = 50;
};

const styleLegend = function(highchart) {
  highchart.legend.itemStyle.fontFamily = typography.font_family_base;
  highchart.legend.itemStyle.color = colors.text_lt_light;
  highchart.legend.itemStyle.fontWeight = typography.regular;
  highchart.legend.itemStyle.fontSize = typography.text_smaller;
};


// Exportable Global Styles Function
export const applyGlobalStyles = function(highchart) {
  applyCustomColors(highchart);
  styleChartContainer(highchart);
  styleLegend(highchart);
};

export default applyGlobalStyles;