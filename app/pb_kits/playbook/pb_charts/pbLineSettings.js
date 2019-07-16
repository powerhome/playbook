import colors from '../tokens/_colors.scss';
import typography from '../tokens/_typography.scss';

const legendOptions = {
  itemStyle: {
    fontFamily: typography.font_family_base,
    color: colors.data_1,
    fontWeight: typography.light,
    fontSize: typography.text_largest,
  },
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom'
}

const chartContainerSpacing = {
  chart: {
    spacingTop: 30,
    spacingBottom: 40,
    spacingLeft: 60,
    spacingRight: 60,
  }
}

export {
  legendOptions,
  chartContainerSpacing
};
