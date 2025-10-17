import React from 'react'
import PbGaugeChart from '../../pb_pb_gauge_chart/_pb_gauge_chart'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'
import Body from '../../pb_body/_body'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Title from '../../pb_title/_title'
import { colors, typography } from 'playbook-ui'

const data = [{ name: "Name", y: 10 }];

const chartOptions = {
  series: [{ data: data }],
  chart: {
    height: "150",
  },
  plotOptions: {
    series: {
      animation: false,
    },
    solidgauge: {
      dataLabels: {
        format:
          `<span class="fix">{y:,f}</span>` +
          `<span style="fill: ${colors.text_lt_light}; font-size: ${typography.text_larger};">%</span>`,
      },
    },
  },
};

const PbGaugeChartComplex = (props) => (
<Flex
    gap="sm"
    padding="xl"
    wrap
  >
    <FlexItem
        flex={1}
        grow
    >
      <Card
          maxWidth="xs"
          padding="md"
      >
        <Title
            paddingBottom="sm"
            size={4}
            text="Abandoned Calls"
        />
        <Flex
            align="stretch"
        >
          <Flex
              marginRight="sm"
              orientation="column"
          >
            <Body
                color="light"
                paddingBottom="sm"
                text="Total Abandoned"
            />
            <Flex
                align="baseline"
                paddingBottom="xs"
            >
              <Title
                  size={1}
                  text="39"
              />
              <Title
                  color="light"
                  size={3}
                  text="calls"
              />
            </Flex>
            <Caption
                size="xs"
                text="of 390"
            />
          </Flex>

          <SectionSeparator
              alignSelf="stretch"
              marginRight="sm"
              orientation="vertical"
          />

          <Flex
              orientation="column"
              wrap
          >
              <Body
                  color="light"
                  text="% Abandoned"
              />
            <Flex
                wrap
            >
              <FlexItem
                  fixedSize="150px"
                  overflow="hidden"
                  shrink
              >
                <PbGaugeChart
                    options={chartOptions}
                    {...props}
                />
               </FlexItem>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </FlexItem>
  </Flex>
)

export default PbGaugeChartComplex
