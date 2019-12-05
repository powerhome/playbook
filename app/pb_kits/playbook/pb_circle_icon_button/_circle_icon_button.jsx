import React from 'react'
import { Button, Icon } from "../"

type CircleIconButtonProps = {
  variant?: 'primary' | 'secondary' | 'link',
  disabled?: Boolean,
  dark?: Boolean,
  className?: String,
  icon: String,
  id?: String,
};

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    variant,
    disabled,
    icon,
    dark
  } = props

  return (
    <div className={'pb_circle_icon_button_kit'}>
      <Button
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
