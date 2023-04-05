import React from 'react'
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
    />
  </React.Fragment>
)

export default Position
