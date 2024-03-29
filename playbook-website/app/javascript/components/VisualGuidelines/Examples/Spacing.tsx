/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Body,
  Caption,
  Flex,
  FlexItem,
} from 'playbook-ui'

import Example from '../Templates/Example'
import SpacingProps from '../Templates/SpacingProps'

const PROPVALUES = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'auto', 'initial', 'inherit']
const PROPNAMES = [
  'margin', 
  'marginLeft', 
  'marginBottom', 
  'marginRight', 
  'marginTop', 
  'marginX', 
  'marginY', 
  'padding', 
  'paddingBottom', 
  'paddingTop', 
  'paddingLeft', 
  'paddingRight', 
  'paddingX', 
  'paddingY' ]

const TOKENS = {
  'XX Small': 'space_xxs',
  'X Small': 'space_xs',
  'Small': 'space_sm',
  'Medium': 'space_md',
  'Large': 'space_lg',
  'X Large': 'space_xl',
}

const screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl', 'default']
}

const Spacing = ({ example, tokensExample }: {example: string, tokensExample?: string}) => (
  <React.Fragment>
    <Example
      description="Used for building Kits: Spacing is sized by 8px which serves as the starting point and base that all spacing options follow."
      // codesandboxExample
      example={example}
      screenSizes={screenSizeProps}
      title="Spacing"
    >
      <SpacingProps propValues={PROPVALUES} propNames={PROPNAMES} screenSizes={screenSizeProps} />
    </Example>
    <Example
        example={tokensExample}
        tokens={TOKENS}
    >
      <Flex justify="evenly" wrap>
        { Object.keys(TOKENS).map((token) => (
          <Flex
              key={token}
              orientation="column"
              align="center"
          >
            <FlexItem>
              <div className="pb--tokens-spacing-token-example">
                <div className={`pb--spacing_${TOKENS[token]}`} />
              </div>
            </FlexItem>
            <FlexItem alignSelf="center">
              <Body text={token} />
            </FlexItem>
            <FlexItem alignSelf="center">
              <Caption
                  size="xs"
                  text={`$${TOKENS[token]}`}
              />
            </FlexItem>
          </Flex>
        )) }
      </Flex>
    </Example>
  </React.Fragment>
)

export default Spacing
