import React from "react";

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'
import Body from '../../pb_body/_body'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Title from '../../pb_title/_title'
import gaugeTheme from '../gaugeTheme'
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsMore from "highcharts/highcharts-more"
import SolidGauge from "highcharts/modules/solid-gauge"
import colors from '../../tokens/exports/_colors.module.scss'
import typography from '../../tokens/exports/_typography.module.scss'

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const data = [{ name: "Name", y: 10 }];

const baseOptions = {
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

const options = Highcharts.merge({}, gaugeTheme, baseOptions);

const GaugeComplex = (props) => (
  <Flex
      gap="sm"
      padding="xl"
      wrap
      {...props}
  >
    <FlexItem
        flex={1}
        grow
        {...props}
    >
      <Card
          maxWidth="xs"
          padding="md"
          {...props}
      >
        <Title
            paddingBottom="sm"
            size={4}
            text="Abandoned Calls"
            {...props}
        />
        <Flex
            align="stretch"
            {...props}
        >
          <Flex
              marginRight="sm"
              orientation="column"
              {...props}
          >
            <Body
                color="light"
                paddingBottom="sm"
                text="Total Abandoned"
                {...props}
            />
            <Flex
                align="baseline"
                paddingBottom="xs"
                {...props}
            >
              <Title
                  size={1}
                  text="39"
                  {...props}
              />
              <Title
                  color="light"
                  size={3}
                  text="calls"
                  {...props}
              />
            </Flex>
            <Caption
                size="xs"
                text="of 390"
                {...props}
            />
          </Flex>

          <SectionSeparator
              alignSelf="stretch"
              marginRight="sm"
              orientation="vertical"
              {...props}
          />

          <Flex
              orientation="column"
              wrap
              {...props}
          >
              <Body
                  color="light"
                  text="% Abandoned"
                  {...props}
              />
            <Flex
                wrap
                {...props}
            >
              <FlexItem
                  fixedSize="150px"
                  overflow="hidden"
                  shrink
                  {...props}
              >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
               </FlexItem>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </FlexItem>
  </Flex>
);

export default GaugeComplex;
