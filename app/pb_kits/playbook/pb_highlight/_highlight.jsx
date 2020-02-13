/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */
import Highlighter from 'react-highlight-words'
import React from 'react'

type HighlightProps = {
  className?: String,
  data?: String,
  id?: String,
  children?: Array<React.ReactChild>,
  text?: String,
  highlightedText?: Array<String>
}

const Highlight = ({
  className = 'pb_highlight_kit',
  children,
  data,
  id,
  text,
  highlightedText = ['the', 'highlight'],
}: HighlightProps) => {
  return (
    <>
      <Highlighter
          autoEscape
          data={data}
          highlightClassName={className}
          highlightTag="span"
          id={id}
          searchWords={highlightedText}
          textToHighlight={text || children}
      />
    </>
  )
}

export default Highlight
