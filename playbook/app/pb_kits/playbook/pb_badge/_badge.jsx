/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import Icon from '../pb_icon/_icon'

type BadgeProps = {
  aria?: object,
  className?: string,
  closeProps?: {
    onClick?: EventHandler,
    onMouseDown?: EventHandler,
    onTouchEnd?: EventHandler,
  },
  data?: object,
  id?: string,
  removeIcon?: Boolean,
  removeOnClick?: EventHandler,
  rounded?: boolean,
  text?: string,
  variant?: "error" | "info" | "neutral" | "primary" | "success" | "warning",
}
const Badge = (props: BadgeProps) => {
  const {
    aria = {},
    className,
    closeProps = {},
    data = {},
    id,
    removeIcon = false,
    removeOnClick = () => {},
    rounded = false,
    text,
    variant = 'neutral',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_badge_kit', variant, { rounded }),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <span>
        {text}
        <If condition={removeIcon}>
          <span
              onClick={removeOnClick}
              style={{ cursor: 'pointer' }}
              {...closeProps}
          >
            <Icon
                fixedWidth
                icon="times"
            />
          </span>
        </If>
      </span>
    </div>
  )
}

export default Badge
