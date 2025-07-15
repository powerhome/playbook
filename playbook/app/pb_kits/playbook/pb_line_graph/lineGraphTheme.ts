import colors from '../tokens/exports/_colors.module.scss'
import typography from '../tokens/exports/_typography.module.scss'

const lineGraphTheme = {
  title: {
    text: "",
    style: {
      color: colors.text_lt_default,
      fontFamily: typography.font_family_base,
      fontWeight: typography.bold,
      fontSize: typography.heading_3,
    },
  },
  subtitle: {
    text: "" ,
    style: {
      fontFamily: typography.font_family_base,
      color: colors.text_lt_light,
      fontWeight: typography.regular,
      fontSize: typography.text_base,
    },
  },
  chart: {
    type: "line",
  },
  tooltip: {
    backgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, colors.bg_dark],
        [1, colors.bg_dark],
      ],
    },
    followPointer: true,
    shadow: false,
    borderWidth: 0,
    borderRadius: 10,
    style: {
      fontFamily: typography.font_family_base,
      color: colors.text_dk_default,
      fontWeight: typography.regular,
      fontSize: typography.text_smaller,
    },
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: false,
      },
    },
  },
  credits: { enabled: false },
  legend: { enabled: false },
  colors: [
    colors.data_1,
    colors.data_2,
    colors.data_3,
    colors.data_4,
    colors.data_5,
    colors.data_6,
    colors.data_7,
  ],
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
      },
    },
    title: {
      style: {
        color: colors.text_lt_default,
        fontFamily: typography.font_family_base,
        fontWeight: typography.regular,
        fontSize: typography.heading_4,
      },
    },
  },
  yAxis: {
    alternateGridColor: undefined as string | undefined,
    minorTickInterval: null as number | null,
    gridLineColor: colors.border_light,
    minorGridLineColor: colors.border_light,
    lineWidth: 0,
    tickWidth: 0,
    tickPixelInterval: 50,
    labels: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
    title: {
      style: {
        fontFamily: typography.font_family_base,
        color: colors.text_lt_lighter,
        fontWeight: typography.bold,
        fontSize: typography.text_smaller,
      },
    },
  },
}

export default lineGraphTheme;
