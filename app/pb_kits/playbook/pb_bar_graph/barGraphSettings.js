import commonSettings from "../pb_dashboard/commonSettings.js"
import colors from "../tokens/_colors.scss"
import typography from "../tokens/_typography.scss";

const sizeColumns = function(highchart) {
    let column = highchart.plotOptions.column
    let series = highchart.plotOptions.series
    
    column.borderRadius = 0
    column.pointPadding = 0.3
    column.groupPadding = 0.2

    series.borderWidth = 0
    series.shadow = false
    series.pointPadding = 0.3
    series.groupPadding = 0.2
}

const colorDataLabels = (highchart) => {
    let column = highchart.plotOptions.column
    let series = highchart.plotOptions.series

    series.dataLabels.color = colors.slate
    series.dataLabels.style.fontFamily = typography.font_family_base;
    series.dataLabels.style.fontSize = typography.font_small;
    
}

const barGraphSettings = function(highchart) {
  commonSettings(highchart)
  sizeColumns(highchart)
  colorDataLabels(highchart)
}

export default barGraphSettings
