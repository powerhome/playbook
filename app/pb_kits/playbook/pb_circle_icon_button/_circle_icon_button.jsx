/* @flow */

import React from 'react'
import { Button, Icon } from '../'

import type { Callback } from '../types'

import {
  noop,
} from '../utilities/props'

type CircleIconButtonProps = {
  className?: String,
  dark?: Boolean,
  disabled?: Boolean,
  icon: String,
  id?: String,
  onClick?: Callback,
  type?: 'button' | 'submit' | 'reset',
  variant?: 'primary' | 'secondary' | 'link',
}

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    dark,
    disabled,
    icon,
    onClick = noop,
    type,
    variant,
  } = props

  return (
    <div className="pb_circle_icon_button_kit">
      <Button
          dark={dark}
          disabled={disabled}
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
