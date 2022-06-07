/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'

import Colors from './Colors'
import MaxWidth from './Examples/MaxWidth'
import Positioning from './Examples/Positioning'
import Spacing from './Examples/Spacing'
import BorderRadius from './Examples/BorderRadius'
import Display from './Examples/Display'
import Cursor from './Examples/Cursor'
import FlexBox from './Examples/FlexBox'

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
      <BorderRadius tokensExample={examples.border_radius_tokens} />
      <Display example={examples.display_in_use_jsx} />
      <Cursor example={examples.cursor_jsx} />
      <FlexBox example={examples.justify_self_jsx} />
    </React.Fragment>
  )
}

export default VisualGuidelines
