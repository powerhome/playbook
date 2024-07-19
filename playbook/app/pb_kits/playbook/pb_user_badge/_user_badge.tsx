import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import Veteran from './badges/veteran'
import MillionDollar from './badges/million-dollar';

type UserBadgeProps = {
  aria?: {[key: string]: string},
  badge?: "million-dollar" | "veteran",
  className?: string,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  size?: "sm" | "md" | "lg",
}

const UserBadge = (props: UserBadgeProps): React.ReactElement => {
  const {
    aria = {},
    badge = 'million-dollar',
    className,
    data = {},
    htmlOptions = {},
    id,
    size = 'md',
  } = props

  const image = badge === "million-dollar" ? <MillionDollar /> : <Veteran />
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_user_badge_kit', size),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <div className="pb_user_badge_wrapper">
        {image}
      </div>
    </div>
  )
}

export default UserBadge
