import React from 'react'
import classnames from "classnames"
import {Button, Icon} from "../"

type CircleIconButtonProps = {
  variant?: 'primary' | 'secondary' | 'link',
  disabled?: Boolean,
  dark?: Boolean,
  className?: String,
  icon: String,
  id?: String,
};

const circleIconButtonCSS = ({
  variant='primary',
  disabled=false,
  dark=false,
}: circleIconButtonProps) => {
  const variantStyle = variant !== null ? `_${variant}` : ''
  const disabledStyle = disabled === true ? '_disabled' : ''
  const darkStyle = dark === true ? '_dark' : ''
  return 'pb_circle_icon_button_kit' + variantStyle + disabledStyle + darkStyle
}

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    variant,
    disabled,
    icon,
    dark
  } = props
  
  return (
    <div className={'pb_circle_icon_button_kit'}>
      <Button text={null} id="pb_circle_icon_button_button" variant={variant} disabled={disabled} dark={dark}>
        <Icon fixedWidth icon={icon} />
      </Button>
    </div>
  );
}

export default CircleIconButton;