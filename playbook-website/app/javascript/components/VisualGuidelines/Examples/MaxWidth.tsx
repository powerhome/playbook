/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Background,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] //TODO: investigate using types

const MaxWidth = ({ example }: {example: string}) => (
  <Example
      description="When building your interface it is common to add max width to specific kits so the interface looks good at all sizes. We've made it easy to add max with ANY kit through our global props. See below:"
      example={example}
      globalProps={{
        maxWidth: SIZES,
      }}
      title="Max Width"
  >
    {SIZES.map((size: string) => (
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
      </Background>
    ))}
  </Example>
)

export default MaxWidth
