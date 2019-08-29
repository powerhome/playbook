import { highchartsTheme } from '../pb_dashboard/pbChartsLightTheme.js';

if (typeof(pbChart) === "undefined") {

  (function(root, factory) {
    const plugin_name = 'pbChart';

    if (typeof define === 'function' && define.amd) {
      define([], factory(plugin_name));
    } else if (typeof exports === 'object') {
      module.exports = factory(plugin_name);
    } else {
      root[plugin_name] = factory(plugin_name);
    }
  }((window || module || {}), function(plugin_name) {
    'use strict';

    const plugin = {};

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
      plugin.this = this;
      plugin.name = plugin_name;
      plugin.element = element;
      plugin.defaults = defaults;
      plugin.options = options;
      plugin.settings = extendDefaults(defaults, options);
      plugin.this.initialize();
    }


    const extendDefaults = (defaults, options) => {
      for (let property in options) {
        if (options.hasOwnProperty(property)) {
          defaults[property] = options[property];
        }
      }

      return defaults;
    };


    Plugin.prototype = {
      initialize: (silent = false) => {
        plugin.this.destroySilently();

        if (!silent) {
          plugin.settings.callbackInitializeBefore.call();
        }

        Highcharts.setOptions(highchartsTheme);
        Highcharts.chart(plugin.defaults.id, {
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
          series: plugin.defaults.chartData,
          credits: false,
        });

        if (!silent) {
          plugin.settings.callbackInitializeAfter.call();
        }
      },

      refresh: (silent = false) => {
        if (!silent) {
          plugin.settings.callbackRefreshBefore.call();
        }

        plugin.this.destroy(silent);
        plugin.this.initialize(silent);
        if (!silent) {
          plugin.settings.callbackRefreshAfter.call();
        }
      },

      destroy: (silent = false) => {
        if (!silent) {
          plugin.settings.callbackDestroyBefore.call();
        }
        if (!silent) {
          plugin.settings.callbackDestroyAfter.call();
        }
      },

      refreshSilently: () => {
        plugin.this.refresh(true);
      },

      destroySilently: () => {
        plugin.this.destroy(true);
      }
    };

    return Plugin;
  }))

}