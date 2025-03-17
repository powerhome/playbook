import React from "react";

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Gauge from '../../pb_gauge/_gauge'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'
import Body from '../../pb_body/_body'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Title from '../../pb_title/_title'

const data = [{ name: "Name", value: 10 }];

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
                <Gauge
                    chartData={data}
                    disableAnimation
                    height="150"
                    id="gauge-complex"
                    suffix="%"
                    {...props}
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
