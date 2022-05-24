import React from "react"
import {
  Caption,
  Title

} from "playbook-ui"

const screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl']
}

const DISPLAY_VALUES = ['inline', 'flex', 'inline_flex', 'inline_block', 'block', 'none']

import Example from "../Templates/Example"

const Display = ({example}: {example: string}) => (
    <React.Fragment>
      <Example
          example={example}
          globalProps={{
            display: DISPLAY_VALUES
          }}
          screenSizes={screenSizeProps}
          title="Display"
      />

    </React.Fragment>
)

export default Display
