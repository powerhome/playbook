import React from 'react'
import classnames from 'classnames'

import { globalProps, GlobalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps } from '../utilities/props'
import { getAllIcons } from "../utilities/icons/allicons"

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
  htmlOptions?: {[key: string]: string | number | boolean | (() => void) | ((event: any) => void) | any},
  id?: string,
  removeIcon?: boolean,
  removeOnClick?: React.MouseEventHandler<HTMLSpanElement>,
  rounded?: boolean,
  tabIndex?: number,
  text?: string,
  variant?: "error" | "info" | "neutral" | "notification" | "notificationError" | "primary" | "success" | "warning",
} & GlobalProps
const Badge = (props: BadgeProps): React.ReactElement => {
  const {
    aria = {},
    className,
    closeProps = {},
    data = {},
    htmlOptions = {},
    id,
    removeIcon = false,
    removeOnClick,
    rounded = false,
    tabIndex,
    text,
    variant = 'neutral',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const css = classnames(
    buildCss('pb_badge_kit',
      variant === "success" ? "success_sm" : variant === "notificationError" ? "notification_error" : variant,
      rounded ? 'rounded' : ''),
    globalProps(props),
    className
  )
  const timesIcon = getAllIcons()["times"]

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
        id={id}
        tabIndex={tabIndex}
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
                className="svg-inline--fa"
                customIcon={timesIcon.icon as unknown as { [key: string]: SVGElement }}
                fixedWidth
            />
          </span>
        )}
      </span>
    </div>
  )
}

export default Badge
