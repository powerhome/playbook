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
  buttonData?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  disabled?: boolean,
  icon: string,
  id?: string,
  link?: string,
  onClick?: Callback,
  newWindow?: boolean,
  type?: 'button' | 'submit' | 'reset',
  variant?: 'primary' | 'secondary' | 'link',
}

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    aria = {},
    buttonData = {},
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
  const classes = classnames(
    buildCss('pb_circle_icon_button_kit'),
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)

  return (
    <div
        className={classes}
        id={id}
        {...ariaProps}
        {...dataProps}
    >
      <Button
          dark={dark}
          data={buttonData}
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
