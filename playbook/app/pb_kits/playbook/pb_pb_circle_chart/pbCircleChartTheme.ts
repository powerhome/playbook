import colors from '../tokens/exports/_colors.module.scss'
import typography from '../tokens/exports/_typography.module.scss'

const pbCircleChartTheme = {
  title: {
    text: "",
    style: {
      color: colors.text_lt_default,
      fontFamily: typography.font_family_base,
      fontWeight: typography.bold,
      fontSize: typography.heading_3,
    },
  },
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
        connectorShape: "straight",
        connectorWidth: 3,
        format: "<div>{point.name}</div>",
        style: {
          fontFamily: typography.font_family_base,
          fontSize: typography.text_smaller,
          color: colors.text_lt_light,
          fontWeight: typography.regular,
          textOutline: '2px $white',
        },
      },
      innerSize: '50%',
      borderColor: "",
      borderWidth: null as number | null,
      colors: [
        colors.data_1,
        colors.data_2,
        colors.data_3,
        colors.data_4,
        colors.data_5,
        colors.data_6,
        colors.data_7,
      ],
    },
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
    itemStyle: {
      fontFamily: typography.font_family_base,
      color: colors.text_lt_light,
      fontWeight: typography.regular,
      fontSize: typography.text_smaller,
    },
    itemHoverStyle: {
      color: colors.text_lt_default,
    },
    itemHiddenStyle: {
      color: colors.text_lt_lighter,
    },
  },
  credits: { enabled: false }
}

export default pbCircleChartTheme;
