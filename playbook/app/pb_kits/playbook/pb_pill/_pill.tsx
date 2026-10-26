import React from 'react'

import classnames from 'classnames'
import Title from '../pb_title/_title'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { GlobalEventProps, globalEventProps } from '../utilities/globalEventProps'

type PillProps = {
  aria?: {[key: string]: string},
  className?: string,
  children?: React.ReactNode,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  notification?: boolean,
  size?: "sm",
  text: string,
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary",
  textTransform?: "none" | "lowercase"
} & GlobalProps & GlobalEventProps

const Pill = (props: PillProps) => {
  const {
    aria = {},
    className,
    children,
    data = {},
    htmlOptions = {},
    id,
    notification = false,
    size,
    text,
    variant = 'neutral',
    textTransform = 'lowercase',
  } = props

  const colorVariant = notification && variant !== 'error' ? 'primary' : variant
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_pill_kit', colorVariant, textTransform, notification ? 'notification' : '', size || ''), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        {...globalEventProps(props)}
        className={classes}
        id={id}
    >
      {
        text ?
          <Title
              className="pb_pill_text"
              size={4}
              tag="div"
              text={text}
          />
        : children
      }
    </div>
  )
}

export default Pill