import React from 'react'

import Example from '../Templates/Example'

import {
  Card,
  Caption,
  CircleIconButton,
  Flex
} from 'playbook-ui'

const SHADOW_VALUES = ["none", "deep", "deeper", "deepest"]
const TOKENS = {
  "$shadow_deep": "value: 0 4px 10px 0 rgb(60 106 172 / 16%)",
  "$shadow_deeper": "value: 0 12px 28px 0 rgb(60 106 172 / 18%)",
  "$shadow_deepest": "value: 0 30px 38px 4px rgb(60 106 172 / 20%), 0 2px 14px 4px rgb(60 106 172 / 10%)"}

const Shadows = ({example, tokensExample}: {example: string, tokensExample: string}) => (
  <React.Fragment>
    <Example
        description="Shadows are a night way of showing depth. Modals, buttons, & popovers are examples of items that need to have a shadow to indicate their position relative to others. Our global props and tokens help you expand those to the other custom elements you build using playbook."
        example={example}
        globalProps={{
          shadow: SHADOW_VALUES,
        }}
        title="Shadows"
    />
    <Example
        example={tokensExample}
        tokens={TOKENS}
    >
    <div className="shadow-wrapper">
      {Object.keys(TOKENS).map((token) => (
          <Card
              padding="none"
              shadow={token}
              marginY="xl"
          >
            <Flex
                key={`token-example-${token}`}
                shadow={TOKENS[token]}
                spacing="between"
                align="center"
            >
              <Flex
                  justfyContent="center"
                  wrap={true}
                  align="center"
              >
                <CircleIconButton
                    icon="copy"
                    paddingRight="sm"
                    variant="link"
                />
                <span>{token}</span>
              </Flex>
              <Flex justify="end">
                <Caption
                    paddingRight="xs"
                    size="xs"
                >
                  {TOKENS[token]}
                </Caption>
              </Flex>
            </Flex>
          </Card>
      ))}
    </div>
    </Example>
  </React.Fragment>
)

export default Shadows
