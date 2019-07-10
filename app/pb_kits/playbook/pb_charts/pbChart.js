import { legendOptions } from './pbLineSettings.js';
import { highchartsTheme } from './pbChartsLightTheme.js';


(function(root, factory) {
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

  const privateMethod = () => {
    // Your private method code here...
  };

  Plugin.prototype = {
    initialize: (silent = false) => {
      plugin.this.destroySilently();

      // Check if the callbacks should not be suppressed
      if (!silent) {
        // Call the initialize before callback
        plugin.settings.callbackInitializeBefore.call();
      }

      Highcharts.setOptions(highchartsTheme);
      Highcharts.chart('mychart', {
        title: {
          text: plugin.defaults.title
        },
        chart: {
          type: plugin.defaults.type
        },
        subtitle: {
          text: plugin.defaults.subtitle
        },
        yAxis: {
          title: {
            text: plugin.defaults.axisTitle
          }
        },
        plotOptions: {
          series: {
            pointStart: plugin.defaults.pointStart
          }
        },
        series: plugin.defaults.data,
        credits: false,
      });



      // Check if the callbacks should not be suppressed
      if (!silent) {
        // Call the initialize after callback
        plugin.settings.callbackInitializeAfter.call();
      }
    },

    publicMethod: () => {
      // Your public method code here...
    },

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

    refreshSilently: () => {
      // Call the refresh method silently
      plugin.this.refresh(true);
    },

    destroySilently: () => {
      // Call the destroy method silently
      plugin.this.destroy(true);
    }
  };

  // Return the plugin
  return Plugin;
}));
