/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import {Badge} from '../'

type HashtagProps = {
  className?: String,
  data?: String,
  id?: String,
  text?: String,
  type: 'default' | 'home' | 'project',
  url?: String,
}


const HashType = {
  "home": "h#",
  "project": "p#",
  "default": "#"
}

const Hashtag = ({
  className,
  data,
  id,
  text,
  type,
  url
} : HashtagProps) => (



<div>
  <a href={url}>
    <Badge variant="primary" text={HashType[`${type}`] + text}/>
  </a>
</div>
)

export default Hashtag
