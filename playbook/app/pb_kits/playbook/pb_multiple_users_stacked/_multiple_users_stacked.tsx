import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import Avatar from '../pb_avatar/_avatar'
import Badge from '../pb_badge/_badge'

type MultipleUsersStackedProps = {
  aria?: { [key: string]: string },
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  size?: "md" | "lg" | "sm" | "xl" 
  users: Array<{ [key: string]: string }>,
  variant: "default" | "bubble",
}

const MultipleUsersStacked = (props: MultipleUsersStackedProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    users,
    size = "sm",
    variant = "default",
  } = props

  const moreThanTwo = users.length > 2
  const onlyOne = users.length == 1
  const isBubble = variant === "bubble"
  const doubleBubble = isBubble && users.length === 2
  const tripleBubble = isBubble && users.length === 3
  const quadrupleBubble = isBubble && users.length > 3
  const sizeClass = isBubble ? `size_${size}` : ""  
  const displayCount = () => {
    return moreThanTwo ? 1 : users.length
  }
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss(
    'pb_multiple_users_stacked_kit',
    { single: onlyOne, bubble: isBubble }, sizeClass),
    globalProps(props),
    className)

  const firstUser = () => {
    return users.slice(0, 1).map((userObject, index) => {
      return (
        <Avatar
            {...userObject}
            className={`pb_multiple_users_stacked_item first_item ${doubleBubble ? "double_bubble" : ""}${tripleBubble ? " triple_bubble" : ""}${quadrupleBubble ? " quadruple_bubble" : ""}`}
            dark={dark}
            key={index}
            size={isBubble ? "md" : "xs"}
        />
      )
    })
  }

  const secondUser = () => {
    if (!moreThanTwo || (isBubble && users.length > 1)) {
      return users.slice(1, 2).map((userObject, index) => {
        return (
          <Avatar
              {...userObject}
              className={`pb_multiple_users_stacked_item second_item ${doubleBubble ? "double_bubble" : ""}${tripleBubble ? " triple_bubble" : ""}${quadrupleBubble ? " quadruple_bubble" : ""}`}
              dark={dark}
              key={index}
              size={isBubble ? "md" : "xs"}
          />
        )
      })
    }
  }

  const thirdUser = () => {
    if (isBubble && users.length > 2) {
      return users.slice(2, 3).map((userObject, index) => {
        return (
          <Avatar
              {...userObject}
              className={`pb_multiple_users_stacked_item third_item ${doubleBubble ? "double_bubble" : ""}${tripleBubble ? " triple_bubble" : ""}${quadrupleBubble ? " quadruple_bubble" : ""}`}
              dark={dark}
              key={index}
              size="md"
          />
        )
      })
    }
  }

  const fourthUser = () => {
    if (isBubble && users.length > 3) {
      return users.slice(3, 4).map((userObject, index) => {
        return (
          <Avatar
              {...userObject}
              className="pb_multiple_users_stacked_item fourth_item quadruple_bubble"
              dark={dark}
              key={index}
              size="md"
          />
        )
      })
    }
  }

  const plusUsers = () => {
    if (moreThanTwo && !isBubble) {
      return (
        <Badge
            className="pb_multiple_users_stacked_item second_item"
            dark={dark}
            rounded
            text={`+${users.length - displayCount()}`}
            variant="primary"
        />
      )
    }
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {firstUser()}
      {secondUser()}
      {thirdUser()}
      {fourthUser()}
      {plusUsers()}
    </div>
  )
}

export default MultipleUsersStacked
