import colors from "../tokens/_colors.scss"
import typography from "../tokens/_typography.scss"

const dataColors = [
  colors.data_1,
  colors.data_2,
  colors.data_3,
  colors.data_4,
  colors.data_5,
  colors.data_6,
  colors.data_7,
  colors.data_8,
]

const applyCustomSeriesColors = function(highchart) {
  highchart.series.forEach(function(item, index) {
    const selected_color = dataColors[index]
    item.color = selected_color
    item.data.forEach(function(data_item) {
      if(data_item.color){
        data_item.color = selected_color
      }

      if(!data_item.marker) return

      if(data_item.marker.lineColor){
        data_item.marker.lineColor = selected_color
      }

      if(data_item.marker.states.hover !== undefined){
        data_item.marker.states.hover.lineColor = selected_color
      }
      
      if(data_item.marker.states.select.lineColor){
        data_item.marker.states.select.lineColor = selected_color
      }
    })
  })
}

const adjustAxisStyle = function(axis) {
  /* Styles grid */
  axis.minorGridLineColor = colors.slate
  axis.minorGridLineWidth = 0.5
  axis.minorGridLineDashStyle = "Dash"
  axis.gridLineWidth = 0.5
  axis.gridLineColor = colors.slate
  axis.gridLineDashStyle = "Dash"

  /* Change line color to $sky */
  axis.lineColor = colors.sky

  /* Change axis label styles */
  axis.labels.style.fontFamily = typography.font_family_base
  axis.labels.style.color = colors.charcoal
  axis.labels.style.fontWeight = typography.light
  axis.labels.style.fontSize = typography.font_small
}

/* Remove grid from background */
const styleAxis = function(highchart) {
  if (Array.isArray(highchart.yAxis)) {
    highchart.yAxis.forEach(function(item) {
      adjustAxisStyle(item)
    })
  } else {
    adjustAxisStyle(highchart.yAxis)
  }

  if (Array.isArray(highchart.xAxis)) {
    highchart.xAxis.forEach(function(item) {
      adjustAxisStyle(item)
    })
  } else {
    adjustAxisStyle(highchart.xAxis)
  }
}

const styleChartContainer = function(highchart) {
  highchart.chart.spacingTop = 30
  highchart.chart.spacingBottom = 40
  highchart.chart.spacingLeft = 50
  highchart.chart.spacingRight = 50
}

const styleLegend = function(highchart) {
  highchart.legend.itemStyle.fontFamily = typography.font_family_base
  highchart.legend.itemStyle.color = colors.text_lt_light
  highchart.legend.itemStyle.fontWeight = typography.regular
  highchart.legend.itemStyle.fontSize = typography.text_smaller
}

// Exportable Global Styles Function
const commonSettings = function(highchart) {
  applyCustomSeriesColors(highchart)
  styleAxis(highchart)
  styleChartContainer(highchart)
  styleLegend(highchart)
}

export {
  commonSettings,
  dataColors,
}
