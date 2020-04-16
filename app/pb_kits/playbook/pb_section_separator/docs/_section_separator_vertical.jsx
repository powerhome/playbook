import React from 'react'
import { Flex, FlexItem, SectionSeparator } from '../../'

const SectionSeparatorVertical = () => {
  return (
    <Flex
        inline="flex-container"
        vertical="stretch"
    >
      <FlexItem>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
      </FlexItem>
      <SectionSeparator orientation="vertical" />
      <FlexItem>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
      </FlexItem>
      <SectionSeparator orientation="vertical" />
      <FlexItem>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
      </FlexItem>
    </Flex>
  )
}

export default SectionSeparatorVertical
