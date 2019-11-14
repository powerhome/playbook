/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import {Badge} from '../'

type TagProps = {
  className?: String,
  data?: String,
  id?: String,
  text?: String,
  type: 'default' | 'home' | 'project',
  url?: String,
}

const TagType = {
  "home": "H#",
  "project": "P#",
  "default": "#"
}

const Tag = ({
  className,
  data,
  id,
  text,
  type,
  url
} : TagProps) => (

<div className={`pb_tag_kit_${type}`}>
  <a href={url}>
    <Badge variant="primary" text={HashType[type] + text}></Badge>
  </a>
</div>
)

export default Tag
