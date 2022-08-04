import React from "react"

import Example from '../Templates/Example'

const Cursor = ({example}: {example: string}) => (
 <Example
    example={example}
    globalProps={{
      cursor: ["pointer"]
    }}
    title="Cursor"
  />
)

export default Cursor
