
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Button from '../pb_button/_button'
import Icon from '../pb_icon/_icon'
import { IconSizes } from "../pb_icon/_icon"

type IconButtonProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  htmlType?: 'submit' | 'reset' | 'button' | undefined,
  icon?: string,
  id?: string,
  link?: string,
  newWindow?: boolean,
  size?: IconSizes,
  target?: string,
  variant?: 'default' | 'link',
}

const IconButton = (props: IconButtonProps) => {
  const {
    aria = {},
    className,
    data = {},
    htmlType = 'button',
    icon = 'bars',
    id,
    link,
    newWindow = false,
    size = "2x",
    target,
    variant = "default",
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_icon_button_kit', variant), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Button
          borderRadius="xs"
          htmlType={htmlType}
          link={link}
          newWindow={newWindow}
          target={target}
      >
        <Icon
            className="icon_button_icon"
            fixedWidth
            icon={icon}
            paddingX="xxs"
            paddingY="xs"
            size={size}
        />
      </Button>
    </div>
  )
}

export default IconButton
