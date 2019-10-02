import commonSettings from "../pb_dashboard/commonSettings.js"

const markerStyles = highchart => {
  highchart.plotOptions.line.marker.enabled = true
  highchart.plotOptions.series.marker.enabled = true
  highchart.plotOptions.series.marker.fillColor = "white"
  highchart.plotOptions.series.marker.lineWidth = 2
}

const fixTooltipStyles = () => {
  document.getElementById("main-view").setAttribute("style", "position: static !important")
}

const pbLineGraph = highchart => {
  commonSettings(highchart)
  markerStyles(highchart)
  fixTooltipStyles()
}

export default pbLineGraph
