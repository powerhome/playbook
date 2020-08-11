/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Avatar, Icon } from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type AvatarActionButtonProps = {
  action?: string,
  aria: Object,
  className?: string,
  data?: Object,
  id?: string,
  imageUrl?: string,
  linkUrl?: string,
  name?: string,
  onClick?: string,
  placement?: string,
  size?: string,
}

const AvatarActionButton = (props: AvatarActionButtonProps) => {
  const {
    action = 'add',
    aria = {},
    className,
    data = {},
    id,
    imageUrl,
    linkUrl,
    name,
    onClick,
    placement = 'bottom left',
    size = 'md',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(buildCss(
    'pb_avatar_action_button_kit',
    [action],
    [placement],
    [size]),
  className,
  globalProps(props))

  const icons = {
    add: 'plus-circle',
    remove: 'times-circle',
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <a
          href={linkUrl}
          onClick={onClick}
      >
        <Avatar
            imageUrl={imageUrl}
            name={name}
            size={size}
        />
        <div className="icon">
          <Icon
              icon={icons[action]}
          />
        </div>
      </a>
    </div>
  )
}

export default AvatarActionButton
