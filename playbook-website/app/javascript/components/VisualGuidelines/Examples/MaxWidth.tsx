/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Background,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] //TODO: investigate using types

const MaxWidthDescription = () => (
  <>
    When building your interface it is common to add max width to specific kits so the interface looks good at all sizes. For articles we recommend paring a "medium" width with "loose" line height. See our <a href="https://playbook.powerapp.cloud/kits/body/react" target="_blank">Body Kit</a> for an example. We've made it easy to add max with ANY kit through our global props. See below:
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
