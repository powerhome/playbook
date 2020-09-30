/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */
import Highlighter from 'react-highlight-words'
import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

type HighlightProps = {
  className?: string,
  data?: string,
  id?: string,
  children?: React.Node,
  text?: string,
  highlightedText?: array<string>,
}

const Highlight = (props: HighlightProps) => {
  const {
    className = 'pb_highlight_kit',
    children,
    data,
    id,
    text,
    highlightedText = ['highlight'],
  } = props
  return (
    <Highlighter
        autoEscape
        data={data}
        highlightClassName={classnames(globalProps(props), className)}
        highlightTag="span"
        id={id}
        searchWords={highlightedText}
        textToHighlight={text || children}
    />
  )
}

export default Highlight
