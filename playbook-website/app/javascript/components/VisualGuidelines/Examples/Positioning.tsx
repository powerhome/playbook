/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Body,
  Caption,
  Card
} from 'playbook-ui'

import Example from '../Templates/Example'

const ZINDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //TODO: investigate using types
const zIndexClassPrefix = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const TOKENS = {
  '$z_1': 100,
  '$z_2': 200,
  '$z_3': 300,
  '$z_4': 400,
  '$z_5': 500,
  '$z_6': 600,
  '$z_7': 700,
  '$z_8': 800,
  '$z_9': 900,
  '$z_10': 1000,
}

const Positioning = ({ example, tokensExample }: {example: string, tokensExample?: string}) => (
  <React.Fragment>
    <Example
        description="If you're going to be using 'absolute' position, you might find it handy to use some of the index properties. We have multiple ways to use z-index, take a look at the examples below:"
        example={example}
        globalProps={{
          zIndex: ZINDEX,
        }}
        title="Positioning"
    />
    <Example
        example={tokensExample}
        tokens={TOKENS}
    >
      <div className="zindex-wrapper">
        {Object.keys(TOKENS).map((token,i) => (
          <Card
              className={`zIndex one-z-index-example ${zIndexClassPrefix[i]}-zIndex`}
              key={`token-example-${token}`}
              shadow="deeper"
              zIndex={TOKENS[token]}
          >
            <Body>{token}</Body>
            <Caption size="md">{`value: ${TOKENS[token]}`}</Caption>
          </Card>
        ))}
      </div>
    </Example>
  </React.Fragment>
)

export default Positioning
