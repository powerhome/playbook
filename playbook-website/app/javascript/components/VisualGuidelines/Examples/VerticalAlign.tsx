import React from "react"
import Example from "../Templates/Example"

const VALUES = ["baseline", "super", "top", "middle", "bottom", "sub", "text-top", "text-bottom"]

const VerticalAlign = ({
  example,
}: {
  example: string,
}) => (
  <>
    <Example
      description='Specifying position can be useful for customizing page elements and layouts. The examples below demonstrate how you can apply (or override) position:'
      example={example}
      globalProps={{
        verticalAlign: VALUES,
      }}
      title='Vertical Align'
    />
  </>
)

export default VerticalAlign
