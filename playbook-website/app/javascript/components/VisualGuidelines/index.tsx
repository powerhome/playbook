/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'

import Colors from './Colors'
import MaxWidth from './Examples/MaxWidth'
import Positioning from './Examples/Positioning'
import LineHeight from './Examples/LineHeight'

const VisualGuidelines = ({ examples }: {examples: {[key: string]: string}}): React.ReactElement => {
  return (
    <React.Fragment>
      <Colors />
      <MaxWidth example={examples.width_jsx} />
      <Positioning
          example={examples.positioning_jsx}
          tokensExample={examples.position_token}
      />
      <LineHeight
          example={examples.line_height_code_jsx}
          tokensExample={examples.line_height_jsx}
      />
    </React.Fragment>
  )
}

export default VisualGuidelines
