import React from 'react'

import Highlight from '../_highlight'

const HighlightCustomColors = (props) => (
  <>
    <Highlight
        backgroundColor='blue'
        borderRadius="xs"
        highlightedText={['highlight kit']}
        padding="xxs"
        text="This is the Highlight Kit"
        textColor='primary'
        {...props}
    />
  </>
)

export default HighlightCustomColors
