import Highcharts from 'highcharts'
import colors from '../tokens/_colors.scss'
// console.log(colors)
import typography from '../tokens/_typography.scss'
// console.log(typography)

import { highchartsTheme } from '../pb_dashboard/pbChartsLightTheme.js'

require('highcharts/modules/variable-pie')(Highcharts)
// require('highcharts/modules/solid-gauge')(Highcharts)
// require('highcharts/modules/highcharts-more')(Highcharts)
import highchartsMore from 'highcharts/highcharts-more.js'
import solidGauge from 'highcharts/modules/solid-gauge.js'

class pbChart {
  defaults = {
    callbackInitializeBefore: () => {},
    callbackInitializeAfter: () => {},
    callbackRefreshBefore: () => {},
    callbackRefreshAfter: () => {},
    callbackDestroyBefore: () => {},
    callbackDestroyAfter: () => {},
    property: 'Value',
  }

  extendDefaults(defaults, options) {
    for (const property in options) {
      if (Object.prototype.hasOwnProperty.call(options, property)) {
        defaults[property] = options[property]
      }
    }
    return defaults
  }

  constructor(element, options) {
    this.element = element
    this.options = options
    this.settings = this.extendDefaults(this.defaults, options)

    if (this.options.type == 'variablepie' || this.options.type ==  'pie'){
      this.setupPieChart()
    } else if (this.options.type == 'gauge') {
      this.setupGauge()
    } else {
      this.setupChart()
    }
  }

  setupGauge() {
    Highcharts.setOptions(highchartsTheme)

    highchartsMore(Highcharts)
    solidGauge(Highcharts)

    Highcharts.chart(this.defaults.id, {

      chart: {
        type: this.defaults.style,
        // height: '120%',
      },

      title: {
        text: this.defaults.title,
      },

      yAxis: {
        min: this.defaults.bounds[0],
        max: this.defaults.bounds[1],
        title: {
          text: this.defaults.caption,
          y: -96,
        },
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 25,
        },
      },

      credits: false,

      label: {
        enabled: true,
      },

      series: [
        {
          data: this.defaults.chartData,
        },
      ],

      pane: {
        center: ['50%', '50%'],
        size: '90%',
        startAngle: this.defaults.circumference[0],
        endAngle: this.defaults.circumference[1],
        background: {
          borderWidth: 20,
          // backgroundColor:
          //   Highcharts.defaultOptions.legend.backgroundColor || '#f7d5e4',
          innerRadius: '90%',
          outerRadius: '90%',
          shape: 'arc',
          className: 'gauge-pane',
        },
      },

      exporting: {
        enabled: false,
      },

      tooltip: {
        headerFormat: '',
        pointFormat: this.defaults.tooltipHtml,
        followPointer: true,
      },

      plotOptions: {
        solidgauge: {
          borderColor: 'blue',
          borderWidth: 20,
          radius: 90,
          innerRadius: '90%',
          dataLabels: {
            borderWidth: 0,
            color: colors.text_lt_default,
            enabled: true,
            format: `{y}${this.defaults.units}`,
            style: {
              fontFamily: typography.font_family_base,
              fontWeight: typography.bold,
              fontSize: typography.heading_4,
            },
          },
        },
      },
    })
    document.querySelectorAll('.gauge-pane').forEach((pane) => pane.setAttribute('stroke-linejoin', 'round'))
  }

  setupPieChart() {
    Highcharts.setOptions(highchartsTheme)

    Highcharts.chart(this.defaults.id, {
      title: {
        text: this.defaults.title,
      },
      chart: {
        type: this.defaults.type,
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: this.defaults.dataLabels,
            connectorShape: 'straight',
            connectorWidth: 3,
            format: this.defaults.dataLabelHtml,
          },
          showInLegend: this.defaults.showInLegend,
        },
      },
      tooltip: {
        headerFormat: this.defaults.headerFormat,
        pointFormat: this.defaults.tooltipHtml,
        useHTML: this.defaults.useHTML,
      },
      series: [{
        minPointSize: this.defaults.minPointSize,
        maxPointSize: this.defaults.maxPointSize,
        innerSize: this.defaults.innerSize,
        data: this.defaults.chartData,
        zMin: this.defaults.zMin,
        startAngle: this.defaults.startAngle,
      }],
      credits: false,
    })
  }

  setupChart() {
    Highcharts.setOptions(highchartsTheme)

    const configOptions = {
      title: {
        text: this.defaults.title,
      },
      chart: {
        height: this.defaults.height,
        type: this.defaults.type,
      },
      subtitle: {
        text: this.defaults.subtitle,
      },
      yAxis: {
        min: this.defaults.yAxisMin,
        max: this.defaults.yAxisMax,
        title: {
          text: this.defaults.axisTitle,
        },
      },
      xAxis: {
        categories: this.defaults.xAxisCategories,
      },
      legend: {
        enabled: this.defaults.legend,
      },
      plotOptions: {
        series: {
          pointStart: this.defaults.pointStart,
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: this.defaults.chartData,
      credits: false,
    }

    if (!this.defaults.toggleLegendClick) {
      configOptions.plotOptions.series.events = { legendItemClick: () => false }
    }

    Highcharts.chart(this.defaults.id, configOptions)
  }

  refresh(silent = false) {
    if (!silent) {
      this.settings.callbackRefreshBefore.call()
    }

    this.this.destroy(silent)
    this.this.initialize(silent)
    if (!silent) {
      this.settings.callbackRefreshAfter.call()
    }
  }

  destroy(silent = false) {
    if (!silent) {
      this.settings.callbackDestroyBefore.call()
    }
    if (!silent) {
      this.settings.callbackDestroyAfter.call()
    }
  }

  refreshSilently() {
    this.this.refresh(true)
  }

  destroySilently() {
    this.this.destroy(true)
  }
}

export default pbChart
