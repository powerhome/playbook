/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Body,
  Caption,
  Card
} from 'playbook-ui'

import Example from '../Templates/Example'

const POSITION = ["relative", "absolute", "fixed", "sticky", "static"]
const TOKENS = {
  '$relative': 'relative',
  '$absolute': 'absolute',
  '$fixed': 'fixed',
  '$sticky': 'sticky',
  '$static': 'static',
}

const Position = ({ example, tokensExample }: { example: string, tokensExample?: string }) => (
  <React.Fragment>
    <Example
      description="Specifying position can be useful for customizing page elements and layouts. The examples below demonstrate how you can apply (or override) position:"
      example={example}
      globalProps={{
        position: POSITION,
      }}
      title="Position"
    />
    <Example
      example={tokensExample}
      tokens={TOKENS}
    >
      <div className="position-wrapper">
        {Object.keys(TOKENS).map((token) => (
          <Card
            className="position"
            key={`token-example-${token}`}
            shadow="deeper"
            position={TOKENS[token]}
          >
            <Body>{token}</Body>
            <Caption size="md">{`value: ${TOKENS[token]}`}</Caption>
          </Card>
        ))}
      </div>
    </Example>
  </React.Fragment>
)

export default Position
