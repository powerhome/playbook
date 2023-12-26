/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Background,
  Title,
  Body,
  Flex
} from 'playbook-ui'

import Example from '../Templates/Example'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] //TODO: investigate using types

const pixels = ['360px', '540px', '720px', '960px', '1140px', '1320px']

const MaxWidthDescription = () => (
  <>
    When building your interface it is common to add max width to specific kits so the interface looks good at all sizes. For articles we recommend pairing a "medium" width with "loose" line height. See our <a href="https://playbook.powerapp.cloud/kits/body/react" target="_blank">Body Kit</a> for an example. We've made it easy to add max with ANY kit through our global props. See below:
  </>
)

const MaxWidth = ({ example }: {example: string}) => (
  <Example
      description={<MaxWidthDescription />}
      example={example}
      globalProps={{
        maxWidth: SIZES,
      }}
      title="Max Width"
  >
    {SIZES.map((size: string, index: number) => (
      <Background
          backgroundColor="gradient"
          key={size}
          marginBottom="xs"
          maxWidth={size}
          padding="xs"
      >
                <Title
            dark
            size={4}
        >
          {size.toUpperCase()}
        </Title>
        {/* <Flex align='center'>

        <Body
          dark
          paddingLeft='xs'
        >
          {'-'}{pixels[index]}
        </Body>
        </Flex> */}
      </Background>
    ))}
  </Example>
)

export default MaxWidth
