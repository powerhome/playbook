/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-multi-comp */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Badge from '../pb_badge/_badge'

type HashtagProps = {
  aria?: {[key: string]: string},
  className?: string,
  dark?: boolean,
  data?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  newWindow?: boolean,
  rel?: string,
  target?: string,
  text?: string,
  type: "default" | "home" | "project" | "appointment",
  url?: string,
} & GlobalProps

const typeMap = {
  home: 'H#',
  project: 'P#',
  appointment: 'A#',
  default: '#',
}

const Hashtag = (props: HashtagProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    newWindow,
    rel,
    target,
    text,
    type = 'default',
    url,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_hashtag_kit'), globalProps(props), className)

  const getTargetAttribute = () => {
    if (target && url) {
      return target
    } else if (newWindow) {
      return '_blank'
    }

    return null
  }

  return (
    <span
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <a
          href={url}
          rel={(newWindow ? "noreferrer" : rel)}
          target={getTargetAttribute()}
      >
        <Badge
            dark={dark}
            text={typeMap[type] + text}
            variant="primary"
        />
      </a>
    </span>
  )
}

export default Hashtag
