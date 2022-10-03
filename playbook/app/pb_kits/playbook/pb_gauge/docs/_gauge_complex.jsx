import React from "react";
import {
  Title,
  Card,
  Gauge,
  Flex,
  FlexItem,
  SectionSeparator,
  Body,
  Caption,
} from "../..";

const data = [{ name: "Name", value: 10 }];

const GaugeComplex = (props) => (
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
        <Flex align="stretch">
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
            <Flex wrap>
              <FlexItem
                  fixedSize="150px"
                  overflow="hidden"
                  shrink
              >
                <Gauge
                    chartData={data}
                    disableAnimation
                    height="100%"
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
