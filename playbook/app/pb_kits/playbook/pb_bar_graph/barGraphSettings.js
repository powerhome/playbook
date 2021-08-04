import { commonSettings } from '../pb_dashboard/commonSettings.js'
import typography from '../tokens/_typography.scss'

const sizeColumns = function(highchart) {
  const column = highchart.plotOptions.column
  const series = highchart.plotOptions.series

  column.borderRadius = 0
  column.pointPadding = 0.3
  column.groupPadding = 0

  series.borderWidth = 0
  series.shadow = false
  series.pointPadding = 0.25
  series.groupPadding = 0
}

const styleDataLabels = (highchart) => {
  const series = highchart.plotOptions.series

  series.dataLabels.style.fontFamily = typography.font_family_base
  series.dataLabels.style.fontSize = typography.text_small
  series.dataLabels.style.fontWeight = typography.bold
}

const barGraphSettings = function(highchart) {
  commonSettings(highchart)
  sizeColumns(highchart)
  styleDataLabels(highchart)
}

export default barGraphSettings
