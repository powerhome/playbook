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
  'xs': '320px min',
  'sm': '480px min',
  'md': '768px min',
  'lg': '1024px min',
  'xl': '1280px min',
  'xxl': '1440px min',
  'xxxl': '1920px min',
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

const MinHeightDescription = () => (
  <>
    We've made it easy to add min height to ANY kit through our global props. See below:
  </>
)

const MinHeight = ({ example }: {example: string}) => (
  <Example
      backgroundClass='minheight-class'
      description={<MinHeightDescription />}
      example={example}
      globalProps={{
        minHeight: Object.keys(VALUES),
      }}
      title="Min Height"
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
              minHeight={size}
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
    <Detail text="To see minimum heights, you can scroll down or resize the container" />
  </Example>
)

export default MinHeight
