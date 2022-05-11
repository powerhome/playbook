/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */
import Highlighter from 'react-highlight-words'
import React from 'react'
import classnames from 'classnames'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type HighlightProps = {
  className?: string,
  data?: {[key: string]: string},
  id?: string,
  children?: React.ReactChild[] | React.ReactChild | string,
  text?: string,
  highlightedText?: string[],
} & GlobalProps

const Highlight = (props: HighlightProps): React.ReactElement => {
  const {
    children,
    className = 'pb_highlight_kit',
    data = {},
    highlightedText = ['highlight'],
    id = '',
    text = '',
  } = props

  const highlightContent: any = text || children;

  return (
    <Highlighter
        autoEscape
        data={data}
        highlightClassName={classnames(globalProps(props), className)}
        highlightTag="mark"
        id={id}
        searchWords={highlightedText}
        textToHighlight={highlightContent}
    />
  )
}

export default Highlight
