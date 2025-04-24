import colors from '../tokens/exports/_colors.module.scss'
import typography from '../tokens/exports/_typography.module.scss'

const circleChartTheme = {
  title: { text: "" },
  chart: {
    type: "pie",
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
    pie: {
      dataLabels: {
        enabled: false,
      },
      innerSize: '50%',
      borderColor: "",
      borderWidth: null as number | null,
    },
  },
  credits: false,

}

export default circleChartTheme;
