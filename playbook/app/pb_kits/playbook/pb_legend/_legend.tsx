import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type LegendProps = {
  aria?: { [key: string]: string },
  className?: string,
  color?: string,
  dark?: boolean,
  data?: Record<string, unknown>,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  prefixText?: string,
  text: string,
}

const Legend = (props: LegendProps) => {
  const {
    aria = {},
    className,
    color = 'data_1',
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    prefixText,
    text,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const customColor = color.charAt(0) === '#' && color

  const customColorStyle = {
  background: customColor
}

 
  const bodyCss = classnames(
    buildCss('pb_legend_kit', customColor ? "" : color),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={bodyCss}
        id={id}
    >
      <Body color={dark ? 'lighter' : 'light'}>
        <span className={`${customColor ? "pb_legend_indicator_circle_custom" : "pb_legend_indicator_circle"}`}
            style={customColorStyle} 
        />
        {
          prefixText && (
            <Title
                dark={dark}
                size={4}
                tag="span"
                text={` ${prefixText} `}
            />
          )
        }
        {` ${text} `}
      </Body>
    </div>
  )
}

export default Legend
