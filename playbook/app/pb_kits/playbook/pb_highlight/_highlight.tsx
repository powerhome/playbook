import React from 'react'
import classnames from 'classnames'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { buildDataProps, buildHtmlProps } from '../utilities/props'
import { findHighlightChunks } from './_highlightChunks'

type HighlightProps = {
  className?: string,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
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
    htmlOptions = {},
    id = '',
    text = '',
  } = props

  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const highlightContent: string = (text || children || '') as string
  const highlightClassName = classnames(globalProps(props), className)
  const chunks = findHighlightChunks(highlightContent, highlightedText)

  return (
    <span
        {...dataProps}
        {...htmlProps}
        id={id}
    >
      {chunks.map((chunk, index) => {
        const chunkText = highlightContent.substring(chunk.start, chunk.end)

        if (chunk.highlight) {
          return (
            <mark
                className={highlightClassName}
                key={index}
            >
              {chunkText}
            </mark>
          )
        }

        return (
          <span key={index}>
            {chunkText}
          </span>
        )
      })}
    </span>
  )
}

export default Highlight
