/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */
import Highlighter from 'react-highlight-words'
import React from 'react'
import classnames from 'classnames'
import { systemProps } from '../utilities/systemProps.js'

type HighlightProps = {
  className?: String,
  data?: String,
  id?: String,
  children?: React.Node,
  text?: String,
  highlightedText?: Array<String>,
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
        highlightClassName={classnames(className, systemProps(props))}
        highlightTag="span"
        id={id}
        searchWords={highlightedText}
        textToHighlight={text || children}
    />
  )
}

export default Highlight
