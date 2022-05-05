import React from 'react'

import Highlight from '../_highlight'
import Body from '../../pb_body/_body'

const HighlightDefault = (props) => (
  <div>
    <Highlight
        highlightedText={['highlight kit']}
        text="This is the Highlight Kit"
        {...props}
    />
    <br />
    <Body>
      {' '}
      {'Hello this is a'}
      {' '}
      <Highlight text=" highlight wrapped"/>
    </Body>
    <br />
    <Body
        highlightedText={['highlighted', 'Body Kit ']}
        highlighting
        text="This is text highlighted in the Body Kit using the text prop."
        {...props}
    />
  </div>
)

export default HighlightDefault
