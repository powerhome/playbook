/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import { Badge } from '../'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type HashtagProps = {
  aria?: object,
  className?: String,
  dark?: boolean,
  data?: String,
  id?: String,
  text?: String,
  type: "default" | "home" | "project" | "appointment",
  url?: String,
}

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
    id,
    text,
    type = 'default',
    url,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_hashtag_kit'), className, globalProps(props))

  return (
    <span
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <a href={url}>
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
