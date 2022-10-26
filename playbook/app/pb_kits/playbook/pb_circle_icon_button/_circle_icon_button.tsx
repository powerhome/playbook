import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { noop } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Button from '../pb_button/_button'
import Icon from '../pb_icon/_icon'

type CircleIconButtonProps = {
  aria?: { [key: string]: string },
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  icon: string,
  id?: string,
  link?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  newWindow?: boolean,
  type?: 'button' | 'submit' | 'reset' | undefined,
  variant?: 'primary' | 'secondary' | 'link',
}

const CircleIconButton = (props: CircleIconButtonProps): React.ReactElement => {
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
  const classes = classnames(
    buildCss('pb_circle_icon_button_kit'),
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
      <Button
          dark={dark}
          disabled={disabled}
          htmlType={type}
          link={link}
          newWindow={newWindow}
          onClick={onClick}
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
