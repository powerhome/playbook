/* @flow */

import React from 'react'
import { Button, Icon } from '../'

type CircleIconButtonProps = {
  type?: 'button' | 'submit' | 'reset',
  variant?: 'primary' | 'secondary' | 'link',
  disabled?: Boolean,
  dark?: Boolean,
  className?: String,
  icon: String,
  id?: String,
}

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    type,
    variant,
    disabled,
    icon,
    dark,
  } = props

  return (
    <div className="pb_circle_icon_button_kit">
      <Button
          type={type}
          dark={dark}
          disabled={disabled}
          text={null}
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
