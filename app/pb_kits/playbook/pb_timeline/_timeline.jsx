/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

type TimelineProps = {
  className?: String,
  data?: String,
  id?: String,
  children?: Array<React.ReactChild>,
  orientation?: String,
}

const Timeline = ({
  className,
  children,
  orientation = 'horizontal',
}: TimelineProps) => {
  const timelineCss = buildCss('pb_timeline_kit', orientation)

  return (
    <div className={classnames(timelineCss, className)}>
      {children}
    </div>
  )
}

export default Timeline
