/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Avatar, Icon } from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

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

const AvatarActionButton = ({
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
}: AvatarActionButtonProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = buildCss({
    'pb_avatar_action_button_kit': true,
    [action]: true,
    [placement]: true,
    [size]: true,
  })

  const icons = {
    add: 'plus-circle',
    remove: 'times-circle',
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, className)}
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
