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
      description='Vertical alignment is an important aspect of layout, particularly for inline text and table cells, where Flex Box support can be limited. Our global prop allows you to quickly apply vertical alignment when and where you need it.'
      example={example}
      globalProps={{
        verticalAlign: VALUES,
      }}
      title='Vertical Align'
    />
  </>
)

export default VerticalAlign
