import { highchartsTheme } from '../pb_dashboard/pbChartsLightTheme.js'

class pbChart {
  defaults = {
    callbackInitializeBefore: () => {},
    callbackInitializeAfter: () => {},
    callbackRefreshBefore: () => {},
    callbackRefreshAfter: () => {},
    callbackDestroyBefore: () => {},
    callbackDestroyAfter: () => {},
    property: 'Value'
  }

  extendDefaults(defaults, options) {
    for (let property in options) {
      if (options.hasOwnProperty(property)) {
        defaults[property] = options[property]
      }
    }
    return defaults
  }

  constructor(element, options) {
    this.element = element
    this.options = options
    this.settings = this.extendDefaults(this.defaults, options)
    this.setupChart()
  }

  setupChart() {
    Highcharts.setOptions(highchartsTheme)

    Highcharts.chart(this.defaults.id, {
      title: {
        text: this.defaults.title
      },
      chart: {
        type: this.defaults.type
      },
      subtitle: {
        text: this.defaults.subtitle
      },
      yAxis: {
        title: {
          text: this.defaults.axisTitle
        }
      },
      plotOptions: {
        series: {
          pointStart: this.defaults.pointStart
        }
      },
      series: this.defaults.chartData,
      credits: false,
    })
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
