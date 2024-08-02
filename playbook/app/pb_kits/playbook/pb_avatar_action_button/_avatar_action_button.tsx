import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildCss,
  buildDataProps, 
  buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Avatar from '../pb_avatar/_avatar'
import Icon from '../pb_icon/_icon'

type AvatarActionButtonProps = {
  action?: "add" | "remove",
  aria?: {[key: string]: string},
  linkAriaLabel?: string,
  className?: string,
  dark?: boolean,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  imageAlt?: string,
  imageUrl?: string,
  linkUrl?: string,
  name?: string,
  onClick?: React.MouseEventHandler<HTMLSpanElement>,
  placement?: string,
  size?: "md" | "lg" | "sm" | "xl" | "xs" | "xxs",
}

const AvatarActionButton = (props: AvatarActionButtonProps): React.ReactElement => {
  const {
    action = 'add',
    aria = {},
    linkAriaLabel,
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    imageAlt = '',
    imageUrl,
    linkUrl,
    name,
    onClick,
    placement = 'bottom left',
    size = 'md',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(buildCss(
    'pb_avatar_action_button_kit',
    action,
    placement,
    size),
  globalProps(props),
  className)

  const icons = {
    add: 'plus-circle',
    remove: 'times-circle',
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <a
          aria-label={linkAriaLabel}
          href={linkUrl}
          onClick={onClick}
      >
        <Avatar
            imageAlt={imageAlt}
            imageUrl={imageUrl}
            name={name}
            size={size}
        />
        <div className={`icon ${dark ? 'dark' : ''}`}>
          <Icon
              dark={dark}
              icon={icons[action]}
          />
        </div>
      </a>
    </div>
  )
}

export default AvatarActionButton
