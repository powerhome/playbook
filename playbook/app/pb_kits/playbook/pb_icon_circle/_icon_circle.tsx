import React from 'react'

import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Icon from '../pb_icon/_icon'

type IconCircleProps = {
  aria?: {[key:string]: string},
  className?: string,
  dark?: boolean,
  data?: {[key:string]: string},
  icon?: string,
  emoji?: string,
  id?: string,
  size?: "base" | "xs" | "sm" | "md" | "lg" | "xl",
  variant?: | "default"
    | "royal"
    | "blue"
    | "purple"
    | "teal"
    | "red"
    | "yellow"
    | "green",
}

const IconCircle = (props: IconCircleProps) => {
  const { aria = {}, className, dark = false, data = {}, emoji, icon, id, size = 'md', variant = 'default' } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_icon_circle_kit', size, variant), globalProps(props), className)

  const isValidEmoji = (emoji: string) => {
    // Using regular expression to check if the string is a valid emoji/emoji Unicode
    const emojiRegex = /^(\p{Emoji}|\uFE0F)+$/u;
    return emojiRegex.test(emoji);
  };

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {
        icon && !emoji && (
          <Icon
            dark={dark}
            icon={icon}
          />
        )
      }
      {
        emoji && !icon && isValidEmoji(emoji) && (
          <span>
            {emoji}
          </span>
        )
      }
     
    </div>
  )
}

export default IconCircle
