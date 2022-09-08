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

const PROPVALUES = ['none', 'xs', 'sm', 'md', 'lg', 'xl']
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
  'Extra Small': 'space_xs',
  'Small': 'space_sm',
  'Medium': 'space_md',
  'Large': 'space_lg',
  'Extra Large': 'space_xl',
}

const Spacing = ({ example, tokensExample }: {example: string, tokensExample?: string}) => (
  <React.Fragment>
    <Example
      description="Used for building Kits: Spacing is sized by 8px which serves as the starting point and base that all spacing options follow."
      example={example}
      title="Spacing"
    >
      <SpacingProps propValues={PROPVALUES} propNames={PROPNAMES} />
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
