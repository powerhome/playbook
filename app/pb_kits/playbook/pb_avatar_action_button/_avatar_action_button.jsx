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
  action?: String,
  aria: Object,
  className?: String,
  data?: Object,
  imageUrl?: String,
  linkUrl?: String,
  name?: String,
  onClick?: String,
  placement?: String,
  size?: String,
}

const AvatarActionButton = ({
  action = 'add',
  aria = {},
  className,
  data = {},
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
    minus: 'minus-circle',
    info: 'info-circle',
    question: 'question-circle',
    exclamation: 'exclamation-circle',
    heart: 'heart-circle',
    sort: 'sort-circle',
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, className)}
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
