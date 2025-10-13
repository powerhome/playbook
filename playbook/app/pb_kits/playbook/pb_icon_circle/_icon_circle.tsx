import React from 'react'

import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Icon from '../pb_icon/_icon'

type IconCircleProps = {
  aria?: {[key:string]: string},
  className?: string,
  dark?: boolean,
  data?: {[key:string]: string},
  icon: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  size?: "base" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl",
  variant?: | "default"
    | "royal"
    | "blue"
    | "purple"
    | "teal"
    | "red"
    | "yellow"
    | "orange"
    | "green"
    | "lighter",
} & GlobalProps

const IconCircle = (props: IconCircleProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    icon,
    id,
    size = 'md',
    variant = 'default'
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_icon_circle_kit', `size_${size}`, variant), globalProps(props), className)


  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
        <Icon
            dark={dark}
            icon={icon}
        />

    </div>
  )
}

export default IconCircle