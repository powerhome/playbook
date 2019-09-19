import commonSettings from "../pb_dashboard/commonSettings.js"

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
    series.borderWidth = 0
    series.shadow = false
}

const pbBarGraph = function(highchart) {
  commonSettings(highchart)
  sizeColumns(highchart)
}

export default pbBarGraph
