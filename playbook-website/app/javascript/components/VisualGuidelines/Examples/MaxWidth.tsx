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
  'xs': '360px max',
  'sm': '540px max',
  'md': '720px max',
  'lg': '960px max',
  'xl': '1140px max',
  'xxl': '1320px max',
  '100%': '100% max'
}

const VALUES: { [value: string]: string } = {
  'xs': 'xs',
  'sm': 'sm',
  'md': 'md',
  'lg': 'lg',
  'xl': 'xl',
  'xxl': 'xxl',
  '100%': '100%',
}

const MaxWidthDescription = () => (
  <>
    When building your interface it is common to add max width to specific kits so the interface looks good at all sizes. For articles we recommend pairing a "medium" width with "loose" line height. See our <a href="https://playbook.powerapp.cloud/kits/body/react" target="_blank">Body Kit</a> for an example. We've made it easy to add max with ANY kit through our global props. See below:
  </>
)

const MaxWidth = ({ example }: {example: string}) => (
  <Example
      backgroundClass='maxwidth-class'
      description={<MaxWidthDescription />}
      example={example}
      globalProps={{
        maxWidth: Object.keys(VALUES),
      }}
      title="Max Width"
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
            maxWidth={size}
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
    <Detail text="To see the maximum widths, you can resize the above container and scroll"/>
  </Example>
)

export default MaxWidth
