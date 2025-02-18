import React from "react"
import {
  Body,
  Caption,
  Card,
  CircleIconButton,
  Flex,
  FlexItem,
  ProgressSimple,
  SectionSeparator,
  Title,
} from 'playbook-ui'

const PipelineChart = () => {
  const pipelineData =  [
      { label: 'Add to Cart', percent: 100.0, value: 2577 },
      { label: 'Shopping Cart', percent: 79.0, value: 2023 },
      { label: 'Payment Methods', percent: 59.0, value: 1567 },
      { label: 'Delivery Methods', percent: 56.0, value: 1252 },
      { label: 'Confirm', percent: 49.0, value: 1182 },
      { label: 'Delivery', percent: 46.0, value: 1098 },
    ]

  return (
    <Card
          borderNone
          margin="sm"
          padding="none"
          shadow="deeper"
      >
        <Flex
            spacing="between"
            vertical="center"
        >
          <Title
              padding="sm"
              size="4"
              text="Pipeline Chart"
          />
          <CircleIconButton
              icon="ellipsis-h"
              variant="link"
          />
        </Flex>
        <SectionSeparator />
    
        {pipelineData.map((row, i) => (
          <Flex
              key={i}
              padding="sm"
              spacing="between"
              vertical="center"
          >
            <FlexItem fixedSize="100px">
    
              <Caption
                  size="xs"
                  text={row.label}
              />
            </FlexItem>
            <FlexItem grow>
              <Flex
                  spacing="around"
                  vertical="center"
              >
                <ProgressSimple
                    percent={row.percent}
                    width="100px"
                />
                <FlexItem fixedSize="50px">
                  <Caption
                      marginX="xs"
                      size="xs"
                      text={`${row.percent}%`}
                  />
                </FlexItem>
              </Flex>
            </FlexItem>
            <FlexItem>
              <Flex vertical="right">
                <Body
                    text={`${row.value}`}
                />
              </Flex>
            </FlexItem>
          </Flex>
          ))}
      </Card>
  )
}

export default PipelineChart
