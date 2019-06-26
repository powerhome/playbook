import colors from '../tokens/_colors.scss';
import typography from '../tokens/_typography.scss';

const fontFamily = "Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif"

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
      fontFamily: fontFamily,
      fontWeight: typography.regular,
      fontSize: typography.heading_3,
    }
  },
  subtitle: {
    style: {
      fontFamily: fontFamily,
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
        fontFamily: fontFamily,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      }
    },
    title: {
      style: {
        color: colors.text_lt_default,
        fontFamily: fontFamily,
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
        fontFamily: fontFamily,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      }
    },
    title: {
      style: {
        fontFamily: fontFamily,
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
      fontFamily: fontFamily,
      color: colors.text_lt_light,
      fontWeight: typography.regular,
      fontSize: typography.text_base,
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
      fontFamily: fontFamily,
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
          [0, 'blue'],
          [1, 'orange']
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
        fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
            stops: [
                [0, '#ff0000'],
                [1, '#f4f4f4']
            ]
        },
        lineWidth: 1,
        marker: {
            enabled: false
        },
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

  toolbar: {
    itemStyle: {
      color: '#CCC'
    }
  },

  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      hoverSymbolStroke: '#FFFFFF',
      theme: {
        fill: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0.4, '#606060'],
            [0.6, '#333333']
          ]
        },
        stroke: '#000000'
      }
    }
  },

  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0.4, '#888'],
          [0.6, '#555']
        ]
      },
      stroke: '#000000',
      style: {
        color: '#CCC',
        fontWeight: 'bold'
      },
      states: {
        hover: {
          fill: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0.4, '#BBB'],
              [0.6, '#888']
            ]
          },
          stroke: '#000000',
          style: {
            color: 'white'
          }
        },
        select: {
          fill: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0.1, '#000'],
              [0.3, '#333']
            ]
          },
          stroke: '#000000',
          style: {
            color: 'yellow'
          }
        }
      }
    },
    inputStyle: {
      backgroundColor: '#333',
      color: 'silver'
    },
    labelStyle: {
      color: 'silver'
    }
  },

  navigator: {
    handles: {
      backgroundColor: '#666',
      borderColor: '#AAA'
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(16, 16, 16, 0.5)',
    series: {
      color: '#7798BF',
      lineColor: '#A6C7ED'
    }
  },

  scrollbar: {
    barBackgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0.4, '#888'],
          [0.6, '#555']
        ]
      },
    barBorderColor: '#CCC',
    buttonArrowColor: '#CCC',
    buttonBackgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0.4, '#888'],
          [0.6, '#555']
        ]
      },
    buttonBorderColor: '#CCC',
    rifleColor: '#FFF',
    trackBackgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, '#000'],
        [1, '#333']
      ]
    },
    trackBorderColor: '#666'
  },

  // special colors for some of the demo examples
  legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
  background2: 'rgb(70, 70, 70)',
  dataLabelsColor: '#444',
  textColor: '#E0E0E0',
  maskColor: 'rgba(255,255,255,0.3)'
}

export { highchartsTheme };
