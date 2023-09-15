import React from 'react'
import Example from '../Templates/Example'
import SpacingProps from '../Templates/SpacingProps'

const OVERFLOW = ["visible", "hidden", "scroll", "auto"]
const PROPNAMES = ['overflow', 'overflowX', 'overflowY']
const TOKENS = {
'$visible': 'visible',
'$hidden': 'hidden',
'$scroll': 'scroll',
'$auto': 'auto'
}

const Overflow = ({ example, tokensExample }: { example: string, tokensExample?: string }) => (
  <React.Fragment>
    <Example
      description="Control over the overflow of a container can be useful for your UI. The overflow prop can be used to override default overflow behavior and apply any of the tokens: "
      example={example}
      title="Overflow"
    >
    <SpacingProps propValues={OVERFLOW} propNames={PROPNAMES} />
    </Example>
    <Example
      example={tokensExample}
      tokens={TOKENS}
    />
  </React.Fragment>
)

export default Overflow