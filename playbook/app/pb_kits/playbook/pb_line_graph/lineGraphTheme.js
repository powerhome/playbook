import colors from '../tokens/exports/_colors.module.scss'
import typography from '../tokens/exports/_typography.module.scss'

const lineGraphTheme = {
  title: { text: "" },
  subtitle: { text: "" },
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
    pointFormat:
      '<span style="font-weight: bold; color:{point.color};">●</span>{point.name}: ' +
      "<b>{point.y}</b>",
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
}

export default lineGraphTheme;
