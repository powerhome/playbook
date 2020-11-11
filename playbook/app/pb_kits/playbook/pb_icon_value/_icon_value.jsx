/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Icon } from '../'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type IconValueProps = {
  align?: "left" | "center" | "right",
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  icon: string,
  id?: number,
  text: string,
}

const IconValue = (props: IconValueProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    dark,
    data = {},
    icon,
    id,
    text,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_icon_value_kit', align),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Body
          color="light"
          dark={dark}
      >
        <Icon
            dark={dark}
            fixedWidth
            icon={icon}
        />
        {text}
      </Body>
    </div>
  )
}

export default IconValue
