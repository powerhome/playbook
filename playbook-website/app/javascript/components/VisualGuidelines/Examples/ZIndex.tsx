/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Body,
  Caption,
  Card
} from 'playbook-ui'

import Example from '../Templates/Example'

const ZINDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //TODO: investigate using types
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

const globalPropsDescription = (
  <>
    {'Available in every kit. These are added globally as they are most flexible when developing.'}
    <p>{'NOTE: For best results, specify a position using the "position" global prop in conjunction with any "zIndex" prop calls.'}</p>
  </>
)

const tokensDescription = (
  <>
    {'Make your own styles using Playbook tokens to keep your site consistent.'}
    <p>{'NOTE: For best results, specify a position value using "position" tokens in conjunction with any "zIndex" style calls.'}</p>
  </>
)

const ZIndex = ({ example, tokensExample }: { example: string, tokensExample?: string }) => (
  <React.Fragment>
    <Example
      description="If you're using Position, you might also find it useful to specify a z-index. We have multiple ways to use z-index, take a look at the examples below:"
      example={example}
      globalProps={{
        zIndex: ZINDEX,
      }}
      globalPropsDescription={globalPropsDescription}
      title="Z-Index"
    />
    <Example
      example={tokensExample}
      tokens={TOKENS}
      tokensDescription={tokensDescription}
    >
      <div className="zindex-wrapper">
        {Object.keys(TOKENS).map((token) => (
          <Card
            className="zIndex"
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

export default ZIndex
