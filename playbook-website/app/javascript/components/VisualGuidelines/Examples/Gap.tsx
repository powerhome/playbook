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
  "none": "0px",
  "xxs": "4px",
  "xs": "8px",
  "sm": "16px",
  "md": "24px",
  "lg": "32px",
  "xl": "40px",
}

const VALUES: { [value: string]: string } = {
  "none": "none",
  "xxs": "xxs",
  "xs": "xs",
  "sm": "sm",
  "md": "md",
  "lg": "lg",
  "xl": "xl",
}

const GapDescription = () => (
  <>
    The `gap` prop allows for spacing between elements in a container. Use this property to easily manage consistent spacing in your layouts. Below is an example of different `gap` sizes applied to a container:
  </>
)

const Gap = ({ example }: { example: string }) => (
  <Example
    backgroundClass="gap-class"
    description={<GapDescription />}
    example={example}
    globalProps={{
      gap: Object.keys(VALUES),
    }}
    title="Gap"
  >
    <Background
      className="gap-container"
      minWidth="xxs"
      overflow="auto"
    >
      {Object.keys(SIZES).map((size: string) => (
        <Flex
          key={size}
          gap={size}
          marginBottom="xs"
          padding="xs"
          backgroundColor="gradient"
        >
          <Title
            dark
            size={4}
            flex={1}
            htmlOptions={{ style: { minWidth: "30px" } }}
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
      ))}
    </Background>
    <Detail text="Resize the container to see how the gap affects spacing between items." />
  </Example>
)

export default Gap
