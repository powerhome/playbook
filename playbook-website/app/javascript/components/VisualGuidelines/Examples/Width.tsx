/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Background,
  Detail,
  Flex,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const SIZES: { [size: string]: string } = {
  '0%': '0%',
  'xs': '360px',
  'sm': '540px',
  'md': '720px',
  'lg': '960px',
  'xl': '1140px',
  'xxl': '1320px',
  '100%': '100%',
}

const VALUES: { [value: string]: string } = {
  '0%': '0%',
  'xs': 'xs',
  'sm': 'sm',
  'md': 'md',
  'lg': 'lg',
  'xl': 'xl',
  'xxl': 'xxl',
  '100%': '100%',
}

const WidthDescription = () => (
  <>
    We've made it easy to add width with ANY kit through our global props. See below:
  </>
)

const Width = ({ example }: {example: string}) => (
  <Example
      backgroundClass='minwidth-class'
      description={<WidthDescription />}
      example={example}
      globalProps={{
        width: Object.keys(VALUES),
      }}
      title="Width"
  >
  <Background
      className="width-resize"
      minWidth="xxs"
      overflow="auto"
  >
    {Object.keys(SIZES).map((size: string) => (
      <Background
          backgroundColor="gradient"
          key={size}
          marginBottom="xs"
          minWidth={size}
          width={size}
          padding="xs"
      >
        <Flex>
          <Title
            dark
            size={4}
            flex={1}
            htmlOptions={{style: {minWidth:"30px"}}}
          >
            {size.toUpperCase()}
          </Title>
          <Detail
            flex={0}
            color="lighter"
          >
            {SIZES[size]}
          </Detail>
        </Flex>
      </Background>
    ))}
  </Background>
  </Example>
)

export default Width
