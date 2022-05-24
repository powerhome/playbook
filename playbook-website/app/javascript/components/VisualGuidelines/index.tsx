/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'

import Colors from './Colors'
import MaxWidth from './Examples/MaxWidth'
import Positioning from './Examples/Positioning'
import Shadows from './Examples/Shadows'
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
      <Shadows
          example={examples.shadow_in_use_jsx}
          tokensExample={examples.shadow_erb}
      />
      <Cursor example={examples.cursor_jsx} />
    </React.Fragment>
  )
}

export default VisualGuidelines
