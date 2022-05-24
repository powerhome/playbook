/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'

import Colors from './Colors'
import MaxWidth from './Examples/MaxWidth'
import Positioning from './Examples/Positioning'
import Spacing from './Examples/Spacing'
import Cursor from './Examples/Cursor'

const VisualGuidelines = ({ examples }: {examples: {[key: string]: string}}): React.ReactElement => {
  return (
    <React.Fragment>
      <Colors />
      <MaxWidth example={examples.width_jsx} />
      <Positioning
          example={examples.positioning_jsx}
          tokensExample={examples.position_token}
      />
      <Spacing
          example={examples.spacing_global_props_jsx}
          tokensExample={examples.spacing_tokens_jsx}
      />
      <Cursor example={examples.cursor_jsx} />
    </React.Fragment>
  )
}

export default VisualGuidelines
