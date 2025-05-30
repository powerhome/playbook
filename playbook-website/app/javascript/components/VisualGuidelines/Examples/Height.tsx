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
  'xs': '320px',
  'sm': '480px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  'xxl': '1440px',
  'xxxl': '1920px',
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

const HeightDescription = () => (
  <>
    We've made it easy to set height for ANY kit through our global props. See below:
  </>
)

const Height = ({ example }: {example: string}) => (
  <Example
      backgroundClass='height-class'
      description={<HeightDescription />}
      example={example}
      globalProps={{
        height: Object.keys(VALUES),
      }}
      title="Height"
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
              height={size}
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
    <Detail text="To see different heights, you can scroll down or resize the container" />
  </Example>
)

export default Height
