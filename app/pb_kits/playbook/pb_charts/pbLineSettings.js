import colors from '../tokens/_colors.scss';

const legendOptions = {
  itemStyle: {
    fontFamily: "Proxima Nova",
    color: "#8798AD",
    fontWeight: "300",
    fontSize: "14px",
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
