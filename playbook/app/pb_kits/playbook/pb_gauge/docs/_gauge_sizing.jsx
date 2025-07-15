import React from 'react'

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const GaugeSizing = (props) => (
  <div>
    <Flex
        align="center"
        wrap
        {...props}
    >
      <FlexItem
          fixedSize="400px"
          overflow="hidden"
          shrink
          {...props}
      >
        <HighchartsReact
            highcharts={Highcharts}
            options={Highcharts.merge({}, gaugeTheme, {
              series: [{ data: [{ name: "Point 1", y: 100 }] }],
            })}
        />
      </FlexItem>
      <FlexItem
          fixedSize="300px"
          overflow="hidden"
          shrink
          {...props}
      >
        <HighchartsReact
            highcharts={Highcharts}
            options={Highcharts.merge({}, gaugeTheme, {
              series: [{ data: [{ name: "Point 2", y: 75 }] }],
            })}
        />
      </FlexItem>
      <FlexItem
          fixedSize="200px"
          overflow="hidden"
          shrink
          {...props}
      >
        <HighchartsReact
            highcharts={Highcharts}
            options={Highcharts.merge({}, gaugeTheme, {
              series: [{ data: [{ name: "Point 3", y: 50 }] }],
            })}
        />
      </FlexItem>
      <FlexItem
          fixedSize="125px"
          overflow="hidden"
          shrink
          {...props}
      >
        <HighchartsReact
            highcharts={Highcharts}
            options={Highcharts.merge({}, gaugeTheme, {
              chart: {
                height: "100%",
              },
              series: [{ data: [{ name: "Point 4", y: 25 }] }],
            })}
        />
      </FlexItem>
    </Flex>
  </div>
)

export default GaugeSizing
