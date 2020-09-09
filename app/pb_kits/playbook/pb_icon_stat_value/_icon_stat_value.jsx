/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Caption, IconCircle, Title } from '../'
import { globalProps } from '../utilities/globalProps.js'

type IconStatValueProps = {
  aria?: object,
  className?: string,
  data?: object,
  icon: string,
  id?: string,
  orientation?: "vertical" | "horizontal",
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  text: string,
  unit?: string,
  value: string | number,
  variant?:
     "default"
    | "royal"
    | "blue"
    | "purple"
    | "teal"
    | "red"
    | "yellow"
    | "green",
}

const IconStatValue = (props: IconStatValueProps) => {
  const {
    aria = {},
    className,
    data = {},
    icon,
    id,
    orientation = "horizontal",
    size = 'md',
    text,
    unit = "",
    value = 0,
    variant = "default",
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_icon_stat_value_kit', orientation),globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <IconCircle
        icon={icon}
        variant={variant}
        size={size}
      />

      <div>
        <Title
            text={value + unit}
        />

        <Caption text={text} />
      </div>


    </div>
  )
}

export default IconStatValue
