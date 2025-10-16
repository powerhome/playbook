import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'


const PbGaugeChartSizing = (props) => (
  <div>
    <Flex
        align="center"
        wrap
    >
      <FlexItem
          fixedSize="400px"
          overflow="hidden"
          shrink
      >
        <PbGaugeChart
            options={{
              series: [{ data: [{ name: "Point 1", y: 100 }] }],
            }}
        />
      </FlexItem>
      <FlexItem
          fixedSize="300px"
          overflow="hidden"
          shrink
      >
        <PbGaugeChart
            options={{
              series: [{ data: [{ name: "Point 2", y: 75 }] }],
            }}
            {...props}
        />
      </FlexItem>
      <FlexItem
          fixedSize="200px"
          overflow="hidden"
          shrink
      >
        <PbGaugeChart
            options={{
              series: [{ data: [{ name: "Point 3", y: 50 }] }],
            }}
        />
      </FlexItem>
      <FlexItem
          fixedSize="125px"
          overflow="hidden"
          shrink
      >
        <PbGaugeChart
            options={{
              chart: {
                height: "100%",
              },
              series: [{ data: [{ name: "Point 4", y: 25 }] }],
            }}
        />
      </FlexItem>
    </Flex>
  </div>
)

export default PbGaugeChartSizing
