// import "./kits.js";
import colors from '../tokens/colors.scss';


var styleChartContainer = function(highchart){
	highchart.chart.spacingTop = 30;
	highchart.chart.spacingBottom = 40;
	highchart.chart.spacingLeft = 60;
	highchart.chart.spacingRight = 60;
};

/* Style Legend */
var styleLegend = function(highchart){
	highchart.legend.itemStyle.fontFamily = "Proxima Nova";
	highchart.legend.itemStyle.color = "#8798AD";
	highchart.legend.itemStyle.fontWeight = "300";
	highchart.legend.itemStyle.fontSize = "14px";
};


/* Size columns */
var sizeColumns = function(highchart){
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
var styleAxis = function(highchart){
	if ( Array.isArray(highchart.yAxis) ) {
		highchart.yAxis.forEach(function(item, index){
			_adjustAxisStyle(item);
		});
	} else {
		_adjustAxisStyle(highchart.yAxis);
	}

	if ( Array.isArray(highchart.xAxis) ) {
		highchart.xAxis.forEach(function(item, index){
			_adjustAxisStyle(item);
		});
	} else {
		_adjustAxisStyle(highchart.xAxis);
	}
}

var _adjustAxisStyle = function(axis){

	/* Styles grid */
	axis.minorGridLineColor = "#E0E6EC";
	axis.minorGridLineWidth = 0.5;
	axis.minorGridLineDashStyle = "Dash";
	axis.gridLineWidth = 0.5;
	axis.gridLineColor = "#E0E6EC";
	axis.gridLineDashStyle = "Dash";

	/* Change line color to $sky */
	axis.lineColor = "#E0E7FF";

	/* Change axis label styles */
	axis.labels.style.fontFamily = "Proxima Nova";
	axis.labels.style.color = "#B0BAC9";
	axis.labels.style.fontWeight = "300";
	axis.labels.style.fontSize = "14px";
};



alert('fired');


;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'PBChart';

    // Check if instantiation should be via` amd, commonjs or the browser`
    if (typeof define === 'function' && define.amd) {
        define([], factory(plugin_name));
    } else if (typeof exports === 'object') {
        module.exports = factory(plugin_name);
    } else {
        root[plugin_name] = factory(plugin_name);
    }
}((window || module || {}), function(plugin_name) {
    // Use strict mode
    'use strict';

    // Create an empty plugin object
    const plugin = {};

    // Set the plugin defaults
    const defaults = {
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},
        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        property: 'Value'
    };

    /**
     * Constructor.
     * @param  {element}  element  The selector element(s).
     * @param  {object}   options  The plugin options.
     * @return {void}
     */
    function Plugin(element, options) {
        // Set the plugin object
        plugin.this = this;
        plugin.name = plugin_name;
        plugin.element = element;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = extendDefaults(defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Merge the default plugin settings with the user options.
     * @param  {object}  defaults  The default plugin settings.
     * @param  {object}  options   The user options.
     * @return {object}            The extended plugin settings.
     */
    const extendDefaults = (defaults, options) => {
        // Cycle through the user options
        for (let property in options) {
            // Check if the property exists in the user options
            if (options.hasOwnProperty(property)) {
                // Set the defaults property to the options property
                defaults[property] = options[property];
            }
        }

        // Return the extended plugin settings
        return defaults;
    };

    /**
     * An example of a private method.
     * @return {void}
     */
    const privateMethod = () => {
        // Your private method code here...
    };

    /**
     * Public variables and methods.
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin.
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        initialize: (silent = false) => {
            // Destroy the existing initialization silently
            plugin.this.destroySilently();

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize before callback
                plugin.settings.callbackInitializeBefore.call();
            }

            // Initialize the plugin here...

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * An example of a public method.
         * @return {void}
         */
        publicMethod: () => {
            // Your public method code here...
        },

        /**
         * Refresh the plugins initialization.
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        refresh: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh before callback
                plugin.settings.callbackRefreshBefore.call();
            }

            // Destroy the existing initialization
            plugin.this.destroy(silent);

            // Initialize the plugin
            plugin.this.initialize(silent);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh after callback
                plugin.settings.callbackRefreshAfter.call();
            }
        },

        /**
         * Destroy an existing initialization.
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        destroy: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy before callback
                plugin.settings.callbackDestroyBefore.call();
            }

            // Remove anything set by the initialization method here...

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the refresh method silently.
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        },

        /**
         * Call the destroy method silently.
         * @return {void}
         */
        destroySilently: () => {
            // Call the destroy method silently
            plugin.this.destroy(true);
        }
    };

    // Return the plugin
    return Plugin;
}));
