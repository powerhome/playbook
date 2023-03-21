/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import Example from '../Templates/Example'

import {
  Title,
  Caption,
  Card,
  Layout
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

const LineHeightDescription = () => (
  <>
    Odds are you might want to build or expand upon the text patterns we have provided. If so below is a good reference of the tokens that are available for you and your typography needs. For articles we recommend paring a "medium" width with "loose" line height. See our <a href="https://playbook.powerapp.cloud/kits/body/react" target="_blank">Body Kit</a> for an example.
  </>
)

const LineHeight = ({ example, tokensExample }: {example: string, tokensExample?: string}) => (
  <React.Fragment>
    <Example
       description={<LineHeightDescription />}
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
      <Layout
          layout="collection"   
      >
        <Layout.Body>
        {Object.keys(TOKENS).map((token) => (
          <Card
              borderNone
              key={`token-example-${token}`}
          >
            <Title
                lineHeight={TOKENS[token]}
                text="The quick brown fox jumps over the lazy dog"
            />
            <Caption
                size="xs"
                text={token}
            />
          </Card>
        ))}
        </Layout.Body>
      </Layout>
    </Example>
  </React.Fragment>
)

export default LineHeight
