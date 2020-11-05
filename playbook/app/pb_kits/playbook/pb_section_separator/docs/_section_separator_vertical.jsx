import React from 'react'
import { Flex, FlexItem, SectionSeparator } from '../../'

const SectionSeparatorVertical = (props) => {
  return (
    <Flex
        inline="flex-container"
        vertical="stretch"
    >
      <FlexItem>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
      </FlexItem>
      <SectionSeparator
          {...props}
          orientation="vertical"
      />
      <FlexItem>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
      </FlexItem>
      <SectionSeparator
          {...props}
          orientation="vertical"
      />
      <FlexItem>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
      </FlexItem>
    </Flex>
  )
}

export default SectionSeparatorVertical
