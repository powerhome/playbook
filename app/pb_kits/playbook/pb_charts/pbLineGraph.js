import { applyGlobalStyles } from './global.js';


const applyLineGraphStyles = function(highchart){
    applyGlobalStyles(highchart);
    highchart.plotOptions.series.marker.enabled = true;
    highchart.plotOptions.line.marker.enabled = true;
    highchart.plotOptions.series.marker.fillColor = "white";
    highchart.plotOptions.series.marker.lineWidth = 2;
    highchart.isHighlightMode = true;
}

export default applyLineGraphStyles;