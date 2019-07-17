import { applyGlobalStyles } from './global.js';


const applyLineGraphStyles = function(highchart){
    highchart.plotOptions.series.marker.enabled = true;
    highchart.plotOptions.line.marker.enabled = true;
    highchart.plotOptions.series.marker.fillColor = "orange";
    highchart.plotOptions.series.marker.lineWidth = 2;
    highchart.isHighlightMode = true;
    applyGlobalStyles(highchart);
}

export default applyLineGraphStyles;