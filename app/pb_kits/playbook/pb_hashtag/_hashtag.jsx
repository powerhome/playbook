/* @flow */
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Button from '../pb_button/_button.jsx'

type HashtagProps = {
  className?: String,
  data?: String,
  id?: String,
  text?: String,
  type: 'default' | 'home' | 'project',
  url?: String
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
  <Button variant="link" link={url} text={HashType[`${type}`] + text}></Button>
  </div>
)

export default Hashtag
