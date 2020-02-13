import React from 'react'
import { Body, Highlight } from '../../'

const HighlightDefault = () => (
  <div>
    <Highlight text="This is the Highlight Kit" />
    <br />
    <Body>
      {' '}
      {'Hello this is a'}
      {' '}
      <Highlight>{' highlight wrapped'}</Highlight>
    </Body>
    <br />
    <Body
        highlightedText={['highlight']}
        highlighting
        text="This is text highlighted in the Body Kit using the text prop."
    />
  </div>
)

export default HighlightDefault
