import React from 'react'

import Highlight from '../_highlight'

const HighlightCustomColors = (props) => (
  <>
    <Highlight
        backgroundColor='blue'
        highlightedText={['highlight kit with custom colors']}
        text="This is the Highlight Kit with custom colors."
        textColor='primary'
        {...props}
    />
  </>
)

export default HighlightCustomColors
