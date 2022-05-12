import React from 'react'
import classnames from 'classnames'

import { globalProps, GlobalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import Icon from '../pb_icon/_icon'

type BadgeProps = {
  aria?: {[key: string]: string},
  className?: string,
  closeProps?: {
    onClick?: React.MouseEventHandler<HTMLSpanElement>,
    onMouseDown?: React.MouseEventHandler<HTMLSpanElement>,
    onTouchEnd?: React.TouchEventHandler<HTMLSpanElement>,
  },
  data?: {[key: string]: string},
  id?: string,
  removeIcon?: boolean,
  removeOnClick?: React.MouseEventHandler<HTMLSpanElement>,
  rounded?: boolean,
  text?: string,
  variant?: "error" | "info" | "neutral" | "primary" | "success" | "warning",
} & GlobalProps
const Badge = (props: BadgeProps) => {
  const {
    aria = {},
    className,
    closeProps = {},
    data = {},
    id,
    removeIcon = false,
    removeOnClick,
    rounded = false,
    text,
    variant = 'neutral',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_badge_kit', variant, rounded ? 'rounded' : null),
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
        {removeIcon && (
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
        )}
      </span>
    </div>
  )
}

export default Badge
