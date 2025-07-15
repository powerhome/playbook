import colors from '../tokens/exports/_colors.module.scss'
import typography from '../tokens/exports/_typography.module.scss'

const gaugeTheme = {
  title: { 
    text: "",
    style: {
      fontFamily: typography.font_family_base,
      fontSize: typography.text_larger,
    },
  },
  chart: {
    type: "solidgauge",
    events: {
      render() {
        this.container
          const arc = this.container.querySelector('path.gauge-pane');
          if (arc) arc.setAttribute('stroke-linejoin', 'round');
      }
    }
  },
  pane: {
    size: "90%",
    startAngle: -100,
    endAngle: 100,
    background: [
      {
        borderWidth: 20,
        innerRadius: "90%",
        outerRadius: "90%",
        shape: "arc",
        className: "gauge-pane",
        borderColor: colors.border_light,
        borderRadius: '50%',
      },
    ],
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
  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: [] as number[],
  },
  plotOptions: {
    solidgauge: {
      borderColor: colors.data_1,
      borderWidth: 20,
      color: colors.data_1,
      radius: 90,
      innerRadius: "90%",
      y: -26,
      dataLabels: {
        borderWidth: 0,
        color: colors.text_lt_default,
        enabled: true,
        format: '<span class="fix">{y:,f}</span>',
        style: {
          fontFamily: typography.font_family_base,
          fontWeight: typography.regular,
          fontSize: typography.heading_2,
        },
        y: -26,
      },
    },
  },
  credits: { enabled: false }
}

export default gaugeTheme;
