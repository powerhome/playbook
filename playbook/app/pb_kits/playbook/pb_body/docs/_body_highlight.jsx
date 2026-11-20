import React from 'react'
import Body from '../../pb_body/_body'

const BodyHighlight = (props) => {
  return (
    <Body
        highlightedText={['highlighting', 'important words']}
        highlighting
        text="Use highlighting to call attention to important words in body text."
        {...props}
    />
  )
}

export default BodyHighlight
