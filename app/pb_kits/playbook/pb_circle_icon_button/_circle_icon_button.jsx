/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Button, Icon } from '../'

import type { Callback } from '../types'

import {
  noop,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type CircleIconButtonProps = {
  aria?: object,
  className?: String,
  dark?: Boolean,
  data?: object,
  disabled?: Boolean,
  icon: String,
  id?: String,
  link?: String,
  onClick?: Callback,
  newWindow?: Boolean,
  type?: 'button' | 'submit' | 'reset',
  variant?: 'primary' | 'secondary' | 'link',
}

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    aria = {},
    className,
    dark,
    data = {},
    disabled,
    icon,
    id,
    onClick = noop,
    type,
    link,
    newWindow,
    variant,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_circle_icon_button_kit'), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Button
          dark={dark}
          disabled={disabled}
          link={link}
          newWindow={newWindow}
          onClick={onClick}
          text={null}
          type={type}
          variant={variant}
      >
        <Icon
            fixedWidth
            icon={icon}
        />
      </Button>
    </div>
  )
}

export default CircleIconButton
