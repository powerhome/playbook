/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import { Badge } from '../'
import { buildCss } from '../utilities/props'

type HashtagProps = {
  className?: String,
  data?: String,
  dark?: Boolean,
  id?: String,
  text?: String,
  type: 'default' | 'home' | 'project' | 'appointment',
  url?: String,
}

const typeMap = {
  'home': 'H#',
  'project': 'P#',
  'appointment': 'A#',
  'default': '#',
}

const Hashtag = ({
  className,
  dark = false,
  text,
  type,
  url,
}: HashtagProps) => (
  <span className={classnames(className, buildCss('pb_hashtag_kit', { 'dark': dark }))}>
    <a href={url}>
      <Badge
          dark={dark}
          text={typeMap[type] + text}
          variant="primary"
      />
    </a>
  </span>
)

export default Hashtag
