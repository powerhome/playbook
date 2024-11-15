/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Background,
  Detail,
  Flex,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const HEIGHTS: { [size: string]: string } = {
  'auto': 'Auto height',
  'xs': '320px max',
  'sm': '480px max',
  'md': '768px max',
  'lg': '1024x max',
  'xl': '1280px max',
  'xxl': '1440px max',
  'xxxl': '1920px max',
}

const VALUES: { [value: string]: string } = {
  'auto': 'auto',
  'xs': 'xs',
  'sm': 'sm',
  'md': 'md',
  'lg': 'lg',
  'xl': 'xl',
  'xxl': 'xxl',
  'xxxl': 'xxxl',
}

const MaxHeightDescription = () => (
  <>
    We've made it easy to add max height to ANY kit through our global props. See below:
  </>
)

const MaxHeight = ({ example }: {example: string}) => (
  <Example
      backgroundClass='maxheight-class'
      description={<MaxHeightDescription />}
      example={example}
      globalProps={{
        maxHeight: Object.keys(VALUES),
      }}
      title="Max Height"
  >
    <Background
        className="maxheight-resize"
        height="sm"
    >
      <Flex wrap>
        {Object.keys(HEIGHTS).map((size: string) => (
          <Background
              backgroundColor="gradient"
              key={size}
              marginBottom="xs"
              marginRight="xs"
              height="sm"
              maxHeight={size}
              padding="xs"
          >
            <>
              <Title
                dark
                size={4}
              >
                {size.toUpperCase()}
              </Title>
              <Detail
                color="lighter"
              >
                {HEIGHTS[size]}
              </Detail>
            </>
          </Background>
        ))}
      </Flex>
    </Background>
    <Detail text="The XS column would go to the bottom of the card but it doesn't because it has a max height" />
  </Example>
)

export default MaxHeight
