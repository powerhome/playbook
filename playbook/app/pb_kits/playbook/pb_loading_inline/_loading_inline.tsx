import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'

type LoadingInlineProps = {
  align?: "left" | "center" | "right",
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
}

const LoadingInline = (props: LoadingInlineProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    data = {},
    htmlOptions = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss(`pb_loading_inline_kit_${align}`),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <Body color="light">
        <Icon
            aria={{ label: 'loading icon' }}
            fixedWidth
            icon="spinner"
            pulse
        />
        {' Loading'}
      </Body>
    </div>
  )
}

export default LoadingInline
