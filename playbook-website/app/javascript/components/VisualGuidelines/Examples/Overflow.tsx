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
      description="The Overflow prop allows you to specify if and how a container's contents are visible when they exceed (i.e., overflow) the container's borders."
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
