/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */
import Highlighter from 'react-highlight-words'
import React from 'react'
import classnames from 'classnames'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { Colors } from '../types'

type HighlightProps = {
  backgroundColor?: Colors | 'yellow' | 'blue',
  className?: string,
  data?: {[key: string]: string},
  id?: string,
  children?: React.ReactChild[] | React.ReactChild | string,
  text?: string,
  textColor?: Colors,
  highlightedText?: string[],
} & GlobalProps

const Highlight = (props: HighlightProps): React.ReactElement => {
  const {
    backgroundColor = 'yellow',
    children,
    className,
    data = {},
    highlightedText = ['highlight'],
    id = '',
    text = '',
    textColor = 'black',
  } = props

  const highlightContent: any = text || children;
  const backgroundColorClass = `highlight_bg_color_${backgroundColor}`
  const textColorClass = `highlight_text_color_${textColor}`

  return (
    <Highlighter
        autoEscape
        data={data}
        highlightClassName={classnames('pb_highlight_kit', backgroundColorClass, textColorClass, globalProps(props), className)}
        highlightTag="mark"
        id={id}
        searchWords={highlightedText}
        textToHighlight={highlightContent}
    />
  )
}

export default Highlight
