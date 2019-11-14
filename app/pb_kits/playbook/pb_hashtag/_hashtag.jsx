/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import {Badge} from '../'

type HashtagProps = {
  className?: String,
  data?: String,
  dark?: Boolean,
  id?: String,
  text?: String,
  type: 'default' | 'home' | 'project',
  url?: String,
}

const HashType = {
  "home": "H#",
  "project": "P#",
  "default": "#"
}

const Hashtag = ({
  className,
  data,
  dark = false,
  id,
  text,
  type,
  url
} : HashtagProps) => {
  const darkClass = dark === true ? "dark" : ""

  return (
    <div className={`pb_hashtag_kit_${darkClass}`}>
      <a href={url}>
        <Badge variant="primary" text={HashType[type] + text} dark={dark}></Badge>
      </a>
    </div>
  )
}

export default Hashtag
