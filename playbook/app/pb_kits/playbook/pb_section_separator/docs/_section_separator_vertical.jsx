import React from 'react'

import SectionSeparator from '../_section_separator'

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const SectionSeparatorVertical = (props) => {
  return (
    <div>
      <Flex
          inline="flex-container"
          marginBottom="lg"
          marginLeft="sm"
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
      <br />

      <Flex
          inline="flex-container"
          marginBottom="lg"
          vertical="stretch"
      >
        <SectionSeparator
            {...props}
            orientation="vertical"
        />
        <div style={{ height: '50px' }}>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        </div>
      </Flex>
      <br />

      <Flex
          inline="flex-container"
          marginTop="lg"
          vertical="stretch"
      >
        <SectionSeparator
            {...props}
            orientation="vertical"
        />
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}
      </Flex>
    </div>

  )
}

export default SectionSeparatorVertical
