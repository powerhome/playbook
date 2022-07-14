/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import Example from '../Templates/Example'

import {
  Body,
  Caption,
  Card,
} from 'playbook-ui'

const HEIGHTS = ['tightest', 'tighter', 'tight', 'normal', 'loose', 'looser', 'loosest']
const TOKENS = {
  '$lh_tightest': 'tightest',
  '$lh_tighter': 'tighter',
  '$lh_tight': 'tight',
  '$lh_normal': 'normal',
  '$lh_loose': 'loose',
  '$lh_looser': 'looser',
  '$lh_loosest': 'loosest',
}

const LineHeight = ({ example, tokensExample }: {example: string, tokensExample?: string}) => (
  <React.Fragment>
    <Example
        description="Odds are you might want to build or expand upon the text patterns we have provided. If so below is a good reference of the tokens that are available for you and your typography needs."
        example={example}
        globalProps={{
          lineHeight: HEIGHTS,
        }}
        title="Line Height"
    />
    <Example
        example={tokensExample}
        tokens={TOKENS}
    >
      <div className="zindex-wrapper">
        {Object.keys(TOKENS).map((token) => (
          <Card
              borderNone
              key={`token-example-${token}`}
          >
            <Body
                lineHeight={TOKENS[token]}
                text="The quick brown fox jumps over the lazy dog"
            />
            <Caption
                size="xs"
                text={token}
            />
          </Card>
        ))}
      </div>
    </Example>
  </React.Fragment>
)

export default LineHeight
