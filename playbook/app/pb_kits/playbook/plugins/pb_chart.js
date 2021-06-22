import Highcharts from 'highcharts'

import { highchartsTheme } from '../pb_dashboard/pbChartsLightTheme'
import colors from '../tokens/exports/_colors.scss'

import pie from 'highcharts/modules/variable-pie'
import highchartsMore from 'highcharts/highcharts-more'
import solidGauge from 'highcharts/modules/solid-gauge'

pie(Highcharts)

// Map Data Color String Props to our SCSS Variables
const mapColors = (array) => {
  const newArray = array.map((item) => {
    return item == 'data-1'
      ? `${colors.data_1}`
      : item == 'data-2'
        ? `${colors.data_2}`
        : item == 'data-3'
          ? `${colors.data_3}`
          : item == 'data-4'
            ? `${colors.data_4}`
            : item == 'data-5'
              ? `${colors.data_5}`
              : item == 'data-6'
                ? `${colors.data_6}`
                : item == 'data-7'
                  ? `${colors.data_7}`
                  : item == 'data-8'
                    ? `${colors.data_8}`
                    : ''
  })
  return newArray
}

// Adjust Circle Chart Block Kit Dimensions to Match the Chart for Centering
const alignBlockElement = (event) => {
  const itemToMove = document.querySelector(`#wrapper-circle-chart-${event.target.renderTo.id} .pb-circle-chart-block`)
  const chartContainer = document.querySelector(`#${event.target.renderTo.id}`)
  if (itemToMove !== null) {
    itemToMove.style.height = `${event.target.chartHeight}px`
    itemToMove.style.width = `${event.target.chartWidth}px`;
    (chartContainer.firstChild).before(itemToMove)
  }
}

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
      this.setupPieChart(options)
    } else if (this.options.type == 'gauge') {
      this.setupGauge()
    } else {
      this.setupChart()
    }
  }

  setupGauge() {
    highchartsMore(Highcharts)
    solidGauge(Highcharts)
    Highcharts.setOptions(highchartsTheme)

    Highcharts.chart(this.defaults.id, {
      chart: {
        type: this.defaults.style,
        height: this.defaults.height,
      },
      title: {
        text: this.defaults.title,
      },
      yAxis: {
        min: this.defaults.min,
        max: this.defaults.max,
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        tickPositions: [this.defaults.min, this.defaults.max],
        labels: {
          y: 26,
          enabled: this.defaults.showLabels,
        },
      },
      credits: false,
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
          innerRadius: '90%',
          outerRadius: '90%',
          shape: 'arc',
          className: 'gauge-pane',
        },
      },
      tooltip: {
        headerFormat: '',
        pointFormat: this.defaults.tooltipHtml,
        followPointer: true,
      },
      plotOptions: {
        series: {
          animation: !this.defaults.disableAnimation,
        },
        solidgauge: {
          dataLabels: {
            format: `<span class="prefix">${this.defaults.prefix}</span>` +
            '<span class="fix">{y:,f}</span>' +
            `<span class="suffix">${this.defaults.suffix}</span>`,
          },
        },
      },
    })
    document.querySelectorAll('.gauge-pane').forEach((pane) => pane.setAttribute('stroke-linejoin', 'round'))
    if (document.querySelector('.prefix')) {
      document.querySelectorAll('.prefix').forEach((prefix) => prefix.setAttribute('y', '28'))
      document.querySelectorAll('.fix').forEach((fix) => fix.setAttribute('y', '38'))
    }
  }

  setupPieChart(options) {
    Highcharts.setOptions(highchartsTheme)
    Highcharts.chart(this.defaults.id, {
      title: {
        text: this.defaults.title,
      },
      chart: {
        type: this.defaults.type,
        events: {
          render: (event) => alignBlockElement(event),
          redraw: (event) => alignBlockElement(event),
        },
      },

      plotOptions: {
        pie: {
          colors: options.colors.length > 0 ? mapColors(options.colors) : highchartsTheme.colors,
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
        innerSize: options.borderWidth == 20 ? '100%' : this.defaults.innerSize,
        data: this.defaults.chartData,
        zMin: this.defaults.zMin,
        startAngle: this.defaults.startAngle,
        borderWidth: this.defaults.borderWidth,
        borderColor: options.borderWidth == 20 ? null : this.defaults.innerSize,
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
