import colors from '../tokens/_colors.scss'
import typography from '../tokens/_typography.scss'

import Highcharts from 'highcharts'

const highchartsTheme = {
  colors: [
    colors.data_1,
    colors.data_2,
    colors.data_3,
    colors.data_4,
    colors.data_5,
    colors.data_6,
    colors.data_7
  ],
  chart: {
    borderWidth: 0,
    borderRadius: 0,
    plotBackgroundColor: null,
    plotShadow: false,
    plotBorderWidth: 0,

  },
  title: {
    style: {
      color: colors.text_lt_default,
      fontFamily: typography.font_family_base,
      fontWeight: typography.regular,
      fontSize: typography.heading_3,
    }
  },
  subtitle: {
    style: {
      fontFamily: typography.font_family_base,
      color: colors.text_lt_light,
      fontWeight: typography.regular,
      fontSize: typography.text_base,
    }
  },
  xAxis: {
    gridLineWidth: 0,
    lineColor: colors.border_light,
    tickColor: colors.border_light,
    labels: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      }
    },
    title: {
      style: {
        color: colors.text_lt_default,
        fontFamily: typography.font_family_base,
        fontWeight: typography.regular,
        fontSize: typography.heading_4,
      }
    }
  },
  yAxis: {
    alternateGridColor: null,
    minorTickInterval: null,
    gridLineColor: colors.border_light,
    minorGridLineColor: colors.border_light,
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      }
    },
    title: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      }
    }
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
    itemStyle: {
      fontFamily: typography.font_family_base,
      color: colors.text_lt_light,
      fontWeight: typography.regular,
      fontSize: typography.text_smaller
    },
    itemHoverStyle: {
      color: colors.text_lt_default,
    },
    itemHiddenStyle: {
      color: colors.text_lt_lighter,
    }
  },
  labels: {
    style: {
      color: colors.primary,
    }
  },
  tooltip: {
    backgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, colors.bg_dark],
        [1, colors.bg_dark]
      ]
    },
    shadow: false,
    borderWidth: 0,
    borderRadius: 10,
    style: {
      fontFamily: typography.font_family_base,
      color: colors.text_dk_default,
      fontWeight: typography.regular,
      fontSize: typography.text_smaller,
    }
  },

  plotOptions: {
    series: {
      type: 'area',
      nullColor: colors.text_lt_lighter,
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, "white"]
        ]
      },
      threshold: null
    },
    line: {
      dataLabels: {
        color: '#CCC'
      },
      marker: {
        lineColor: '#333'
      },
      area: {
        shadow: false,
        states: {
            hover: {
                lineWidth: 1
            }
        },
        threshold: null
      }
    }
  },
}

export { highchartsTheme }
