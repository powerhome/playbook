import React from 'react'
import { Body, Highlight } from '../../'

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
      <Highlight>{' highlight wrapped'}</Highlight>
    </Body>
    <br />
    <Body
        highlightedText={['highlighted in the Body Kit ']}
        highlighting
        text="This is text highlighted in the Body Kit using the text prop."
        {...props}
    />
  </div>
)

export default HighlightDefault
