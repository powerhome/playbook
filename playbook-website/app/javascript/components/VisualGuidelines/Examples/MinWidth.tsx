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
  'xs': '360px min',
  'sm': '540px min',
  'md': '720px min',
  'lg': '960px min',
  'xl': '1140px min',
  'xxl': '1320px min ',
  '100%': '100% min',
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

const MinWidthDescription = () => (
  <>
    We've made it easy to add min with ANY kit through our global props (except the popover kit). See below:
  </>
)

const MinWidth = ({ example }: {example: string}) => (
  <Example
      backgroundClass='minwidth-class'
      description={<MinWidthDescription />}
      example={example}
      globalProps={{
        minWidth: Object.keys(VALUES),
      }}
      title="Min Width"
  >
  <Background
      className="minwidth-resize"
      minWidth="xxs"
      overflow="auto"
  >
    {Object.keys(SIZES).map((size: string) => (
      <Background
          backgroundColor="gradient"
          key={size}
          marginBottom="xs"
          minWidth={size}
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
  <Detail text="To see minimum widths, you can resize the above container and scroll" />
  </Example>
)

export default MinWidth
