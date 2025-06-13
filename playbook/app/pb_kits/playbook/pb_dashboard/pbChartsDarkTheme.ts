import colors from '../tokens/exports/_colors.module.scss'
import typography from '../tokens/exports/_typography.module.scss'

import { ThemeProps } from './themeTypes'

const highchartsDarkTheme: ThemeProps = {
  lang: {
    thousandsSep: ',',
  },
  colors: [
    colors.data_1,
    colors.data_2,
    colors.data_3,
    colors.data_4,
    colors.data_5,
    colors.data_6,
    colors.data_7,
  ],
  chart: {
    borderWidth: 0,
    borderRadius: 0,
    plotBackgroundColor: undefined,
    plotShadow: false,
    plotBorderWidth: 0,
  },
  title: {
    style: {
      color: colors.text_dk_default,
      fontFamily: typography.font_family_base,
      fontWeight: typography.bold,
      fontSize: typography.heading_3,
    },
  },
  subtitle: {
    style: {
      fontFamily: typography.font_family_base,
      color: colors.text_dk_light,
      fontWeight: typography.regular,
      fontSize: typography.text_base,
    },
  },
  xAxis: {
    gridLineWidth: 0,
    lineColor: colors.border_dark,
    tickColor: colors.border_dark,
    labels: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_dk_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
    title: {
      style: {
        color: colors.text_dk_default,
        fontFamily: typography.font_family_base,
        fontWeight: typography.regular,
        fontSize: typography.heading_4,
      },
    },
  },
  yAxis: {
    alternateGridColor: undefined,
    minorTickInterval: null,
    gridLineColor: colors.border_dark,
    minorGridLineColor: colors.border_dark,
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_dk_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
    title: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_dk_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
    itemStyle: {
      fontFamily: typography.font_family_base,
      color: colors.text_dk_light,
      fontWeight: typography.regular,
      fontSize: typography.text_smaller,
    },
    itemHoverStyle: {
      color: colors.text_dk_default,
    },
    itemHiddenStyle: {
      color: colors.text_dk_lighter,
    },
  },
  tooltip: {
    backgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, colors.card_light],
        [1, colors.card_light],
      ],
    },
    shadow: false,
    borderWidth: 0,
    borderRadius: 10,
    style: {
      fontFamily: typography.font_family_base,
      color: colors.text_lt_default,
      fontWeight: typography.regular,
      fontSize: typography.text_smaller,
    },
  },
  // specific to gauge
  // unfilled gauge color
  pane: {
    background: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
      // @ts-ignore
      borderColor: colors.border_dark,
    },
  },

  plotOptions: {
    series: {
      borderColor: colors.bg_dark_card,
      borderWidth: 2,
      threshold: null,
    },
    // PIE STYLES
    pie: {
      colors: [
        colors.data_1,
        colors.data_2,
        colors.data_3,
        colors.data_4,
        colors.data_5,
        colors.data_6,
        colors.data_7,
      ],
      dataLabels: {
        style: {
          fontFamily: typography.font_family_base,
          fontSize: typography.text_smaller,
          color: colors.text_dk_light,
          fontWeight: typography.regular,
        },
      },
    },

    // LINE CHART STYLES
    line: {
      dataLabels: {
        color: colors.text_dk_light,
      },
      marker: {
        lineColor: colors.border_dark,
      },
    }
  },
  credits: {
    enabled: false
  },
}

export { highchartsDarkTheme }
