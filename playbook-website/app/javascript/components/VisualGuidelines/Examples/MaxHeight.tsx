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
  'auto': 'auto',
  'xs': '320px max',
  'sm': '480px max',
  'md': '768px max',
  'lg': '1024px max',
  'xl': '1280px max',
  'xxl': '1440px max',
  'xxxl': '1920px max',
  '100%': '100%',
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
  '100%': '100%',
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
        className="height-resize"
        height="sm"
        overflowY="auto"
    >
      <Flex justify="between" height="xxxl">
        {Object.keys(HEIGHTS).map((size: string) => (
          <Background
              backgroundColor="gradient"
              key={size}
              marginBottom="xs"
              height="xxxl"
              maxHeight={size}
              padding="xs"
          >
            <>
              <Title
                dark
                size={4}
                textAlign="center"
              >
                {size.toUpperCase()}
              </Title>
              <Detail
                color="lighter"
                textAlign="center"
              >
                {HEIGHTS[size]}
              </Detail>
            </>
          </Background>
        ))}
      </Flex>
    </Background>
    <Detail text="To see maximum heights, you can scroll down or resize the container" />
  </Example>
)

export default MaxHeight
